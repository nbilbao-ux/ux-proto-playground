import React, { useEffect, useMemo, useState, useRef } from 'react';
import styled from 'styled-components';
import { SettingsPageLayout } from '@/settings/SettingsPageLayout';
import { Button, Card, CardBody, CardHeader, CardTitle, Divider, Input, Select, Tag, VStack, FieldLabel, FieldHint, FieldRow, FieldControl, Modal } from '@/ui/primitives';
import { tradeLaneService, portService } from '@/network/services/entityService';
import type { TradeLanePreference, Port } from '@/network/types';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;


const AddForm = styled.div`
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 140px auto;
  gap: 12px;
  align-items: end;
`;

const PortSearchWrapper = styled.div`
  position: relative;
  
  &.port-search-wrapper {
    /* Class for click outside detection */
  }
`;

const PortSearchInput = styled(Input)`
  width: 100%;
`;

const PortDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

const PortOption = styled.div<{ $selected?: boolean }>`
  padding: 10px 12px;
  cursor: pointer;
  font-size: 13px;
  border-bottom: 1px solid var(--border);
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  
  ${(p) => p.$selected ? 'background: rgba(106,167,255,0.15);' : ''}
`;

const PortOptionName = styled.div`
  font-weight: 600;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 2px;
`;

const PortOptionDetails = styled.div`
  font-size: 11px;
  color: var(--text-muted);
`;

const EmptyState = styled.div`
  padding: 40px 16px;
  text-align: center;
  color: var(--text-muted);
  font-size: 13px;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LaneRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  
  &:last-child {
    border-bottom: none;
  }
`;

const LaneInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LaneRoute = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.88);
  flex: 1;
`;

const Dropzone = styled.div<{ $isDragging?: boolean; $hasFile?: boolean }>`
  border: 2px dashed ${(p) => (p.$isDragging ? 'rgba(106,167,255,0.45)' : 'var(--border)')};
  border-radius: var(--radius-sm);
  padding: 32px;
  text-align: center;
  background: ${(p) => (p.$isDragging ? 'rgba(106,167,255,0.05)' : 'rgba(255,255,255,0.02)')};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: rgba(106,167,255,0.30);
    background: rgba(106,167,255,0.03);
  }
`;

const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const DropzoneIcon = styled.div`
  font-size: 32px;
  color: var(--text-muted);
`;

const DropzoneText = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 600;
`;

const DropzoneHint = styled.div`
  font-size: 12px;
  color: var(--text-muted);
`;

const FileInput = styled.input`
  display: none;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 13px;
`;

const FileName = styled.div`
  color: rgba(255, 255, 255, 0.88);
  flex: 1;
`;

const FileStatus = styled.div<{ $status: 'processing' | 'success' | 'error' }>`
  font-size: 12px;
  margin-right: 8px;
  ${(p) => {
    if (p.$status === 'processing') return 'color: var(--text-muted);';
    if (p.$status === 'success') return 'color: rgba(78,224,138,0.95);';
    if (p.$status === 'error') return 'color: rgba(255,92,122,0.95);';
  }}
`;

const ImportResults = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: rgba(78,224,138,0.10);
  border: 1px solid rgba(78,224,138,0.26);
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: rgba(210,255,232,0.95);
`;


interface UploadedFile {
  id: string;
  file: File;
  status: 'processing' | 'success' | 'error';
  lanesFound?: number;
  error?: string;
}

export function NetworkPortsLanes() {
  const [tradeLanes, setTradeLanes] = useState<TradeLanePreference[]>([]);
  const [ports, setPorts] = useState<Port[]>([]);
  const [loading, setLoading] = useState(true);

  // Import state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [importResults, setImportResults] = useState<{ lanesAdded: number; duplicatesSkipped: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add form state
  const [addOriginSearch, setAddOriginSearch] = useState('');
  const [addOriginPort, setAddOriginPort] = useState<Port | null>(null);
  const [addOriginSearchResults, setAddOriginSearchResults] = useState<Port[]>([]);
  const [addOriginSearchOpen, setAddOriginSearchOpen] = useState(false);
  const [addDestinationSearch, setAddDestinationSearch] = useState('');
  const [addDestinationPort, setAddDestinationPort] = useState<Port | null>(null);
  const [addDestinationSearchResults, setAddDestinationSearchResults] = useState<Port[]>([]);
  const [addDestinationSearchOpen, setAddDestinationSearchOpen] = useState(false);
  const [addMode, setAddMode] = useState<'ocean' | 'air' | 'truck'>('ocean');

  // Sort state
  const [sortBy, setSortBy] = useState<'origin' | 'destination' | 'mode'>('origin');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [lanes, allPorts] = await Promise.all([
        tradeLaneService.getAll(),
        portService.getAll(),
      ]);
      setTradeLanes(lanes);
      setPorts(allPorts);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Flatten trade lanes to unique port pairs
  const uniqueLanes = useMemo(() => {
    const lanes: Array<{
      id: string;
      originPort: Port;
      destinationPort: Port;
      mode: 'ocean' | 'air' | 'truck';
    }> = [];

    for (const lane of tradeLanes) {
      if (!lane.originPortId || !lane.destinationPortId || !lane.mode) continue;
      
      // Filter out 'rail' mode as it's not supported in the UI
      if (lane.mode === 'rail') continue;

      const originPort = lane.originPort || ports.find(p => p.id === lane.originPortId);
      const destPort = lane.destinationPort || ports.find(p => p.id === lane.destinationPortId);
      
      if (!originPort || !destPort) continue;

      lanes.push({
        id: lane.id,
        originPort,
        destinationPort: destPort,
        mode: lane.mode,
      });
    }

    return lanes;
  }, [tradeLanes, ports]);

  // Sort lanes
  const sortedLanes = useMemo(() => {
    const sorted = [...uniqueLanes].sort((a, b) => {
      let aValue: string;
      let bValue: string;

      if (sortBy === 'origin') {
        aValue = a.originPort.name.toLowerCase();
        bValue = b.originPort.name.toLowerCase();
      } else if (sortBy === 'destination') {
        aValue = a.destinationPort.name.toLowerCase();
        bValue = b.destinationPort.name.toLowerCase();
      } else {
        aValue = a.mode.toLowerCase();
        bValue = b.mode.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [uniqueLanes, sortBy, sortDirection]);

  // Search ports
  useEffect(() => {
    if (addOriginSearch.trim().length > 0) {
      const timeout = setTimeout(async () => {
        const results = await portService.search(addOriginSearch);
        setAddOriginSearchResults(results);
        setAddOriginSearchOpen(true);
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      setAddOriginSearchResults([]);
      setAddOriginSearchOpen(false);
    }
  }, [addOriginSearch]);

  useEffect(() => {
    if (addDestinationSearch.trim().length > 0) {
      const timeout = setTimeout(async () => {
        const results = await portService.search(addDestinationSearch);
        setAddDestinationSearchResults(results);
        setAddDestinationSearchOpen(true);
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      setAddDestinationSearchResults([]);
      setAddDestinationSearchOpen(false);
    }
  }, [addDestinationSearch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.port-search-wrapper')) {
        setAddOriginSearchOpen(false);
        setAddDestinationSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddOriginSelect = (port: Port) => {
    setAddOriginPort(port);
    setAddOriginSearch(port.name);
    setAddOriginSearchOpen(false);
  };

  const handleAddDestinationSelect = (port: Port) => {
    setAddDestinationPort(port);
    setAddDestinationSearch(port.name);
    setAddDestinationSearchOpen(false);
  };

  const handleAddLane = async () => {
    if (!addOriginPort || !addDestinationPort) return;

    try {
      await tradeLaneService.create({
        originPortId: addOriginPort.id,
        originPort: addOriginPort,
        destinationPortId: addDestinationPort.id,
        destinationPort: addDestinationPort,
        mode: addMode,
      });

      // Reset form but keep it open for adding more
      setAddOriginPort(null);
      setAddDestinationPort(null);
      setAddOriginSearch('');
      setAddDestinationSearch('');
      setAddMode('ocean');

      // Reload data
      await loadData();
    } catch (error) {
      console.error('Failed to create trade lane:', error);
    }
  };

  const handleRemoveLane = async (laneId: string) => {
    try {
      await tradeLaneService.delete(laneId);
      await loadData();
    } catch (error) {
      console.error('Failed to delete trade lane:', error);
    }
  };

  const handleSort = (column: 'origin' | 'destination' | 'mode') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  const formatPortDisplay = (port: Port) => {
    return `${port.name} (${port.unLocode})`;
  };

  const formatModeDisplay = (mode: 'ocean' | 'air' | 'truck') => {
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  };

  const canAdd = addOriginPort && addDestinationPort && addOriginPort.id !== addDestinationPort.id;

  // File upload handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFiles = async (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file, idx) => ({
      id: `file_${Date.now()}_${idx}`,
      file,
      status: 'processing' as const,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setImportResults(null);

    // Process each file
    for (const fileItem of newFiles) {
      await processFile(fileItem);
    }
  };

  const processFile = async (fileItem: UploadedFile) => {
    try {
      // Simulate file parsing - in production, this would call an API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock parsing: extract trade lanes from document
      // In production, this would use OCR/document parsing
      const mockLanes = extractTradeLanesFromFile(fileItem.file);

      if (mockLanes.length === 0) {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id
              ? { ...f, status: 'error' as const, error: 'No trade lanes found in document' }
              : f
          )
        );
        return;
      }

      // Add lanes (with deduplication)
      let lanesAdded = 0;
      let duplicatesSkipped = 0;

      for (const lane of mockLanes) {
        // Check if lane already exists
        const exists = tradeLanes.some(
          (existing) =>
            existing.originPortId === lane.originPortId &&
            existing.destinationPortId === lane.destinationPortId &&
            existing.mode === lane.mode
        );

        if (!exists) {
          await tradeLaneService.create(lane);
          lanesAdded++;
        } else {
          duplicatesSkipped++;
        }
      }

      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileItem.id
            ? { ...f, status: 'success' as const, lanesFound: mockLanes.length }
            : f
        )
      );

      setImportResults({
        lanesAdded,
        duplicatesSkipped,
      });

      // Reload data
      await loadData();
    } catch (error) {
      console.error('Failed to process file:', error);
      setUploadedFiles((prev) =>
        prev.map((f) =>
          f.id === fileItem.id
            ? { ...f, status: 'error' as const, error: 'Failed to process file' }
            : f
        )
      );
    }
  };

  // Mock function to extract trade lanes from file
  // In production, this would use OCR/document parsing APIs
  const extractTradeLanesFromFile = (file: File): Array<Omit<TradeLanePreference, 'id' | 'createdAt' | 'updatedAt'>> => {
    // Mock extraction - randomly generate some lanes based on file name
    // In production, this would parse the actual document content
    const fileName = file.name.toLowerCase();
    const lanes: Array<Omit<TradeLanePreference, 'id' | 'createdAt' | 'updatedAt'>> = [];

    // Mock: if file contains "china" or "asia", add some common lanes
    if (fileName.includes('china') || fileName.includes('asia') || fileName.includes('shipping') || fileName.includes('bill')) {
      const yantian = ports.find((p) => p.unLocode === 'CNYTN');
      const la = ports.find((p) => p.unLocode === 'USLAX');
      const tacoma = ports.find((p) => p.unLocode === 'USTIW');
      const chicago = ports.find((p) => p.unLocode === 'USCHI');

      if (yantian && la) {
        lanes.push({
          originPortId: yantian.id,
          originPort: yantian,
          destinationPortId: la.id,
          destinationPort: la,
          mode: 'ocean',
        });
      }
      if (yantian && tacoma) {
        lanes.push({
          originPortId: yantian.id,
          originPort: yantian,
          destinationPortId: tacoma.id,
          destinationPort: tacoma,
          mode: 'ocean',
        });
      }
      if (yantian && chicago) {
        lanes.push({
          originPortId: yantian.id,
          originPort: yantian,
          destinationPortId: chicago.id,
          destinationPort: chicago,
          mode: 'ocean',
        });
      }
    }

    // If no lanes found, add at least one mock lane
    if (lanes.length === 0) {
      const origin = ports[0];
      const dest = ports[ports.length - 1];
      if (origin && dest) {
        lanes.push({
          originPortId: origin.id,
          originPort: origin,
          destinationPortId: dest.id,
          destinationPort: dest,
          mode: 'ocean',
        });
      }
    }

    return lanes;
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    if (uploadedFiles.length === 1) {
      setImportResults(null);
    }
  };

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <SettingsPageLayout 
      title="Trade Lanes" 
      subtitle="Configure preferred port pairs for origin and destination by transportation mode."
    >
      <VStack $gap={14}>
        <Card>
          <CardBody style={{ padding: 0 }}>
            <FieldRow>
              <div>
                <FieldLabel>Tradelane Import</FieldLabel>
                <FieldHint>
                  Upload your previous shipment documents (bills of lading, shipping manifests, etc.). We'll scan, parse, deduplicate, and automatically add trade lanes to your preferences.
                </FieldHint>
              </div>
              <FieldControl>
                <Button
                  $variant="primary"
                  onClick={() => setIsImportModalOpen(true)}
                >
                  Import Trade Lanes
                </Button>
              </FieldControl>
            </FieldRow>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferred Trade Lanes</CardTitle>
          </CardHeader>

          <AddForm>
            <FieldLabel>Add Trade Lane</FieldLabel>
            <FormRow>
                  <PortSearchWrapper className="port-search-wrapper">
                    <PortSearchInput
                      placeholder="Search origin port..."
                      value={addOriginSearch}
                      onChange={(e) => {
                        setAddOriginSearch(e.target.value);
                        if (!e.target.value) {
                          setAddOriginPort(null);
                        }
                      }}
                      onFocus={() => {
                        if (addOriginSearchResults.length > 0) {
                          setAddOriginSearchOpen(true);
                        }
                      }}
                    />
                    {addOriginSearchOpen && addOriginSearchResults.length > 0 && (
                      <PortDropdown>
                        {addOriginSearchResults.map((port) => (
                          <PortOption
                            key={port.id}
                            $selected={addOriginPort?.id === port.id}
                            onClick={() => handleAddOriginSelect(port)}
                          >
                            <PortOptionName>{formatPortDisplay(port)}</PortOptionName>
                            <PortOptionDetails>{port.city}, {port.country}</PortOptionDetails>
                          </PortOption>
                        ))}
                      </PortDropdown>
                    )}
                  </PortSearchWrapper>

                  <PortSearchWrapper className="port-search-wrapper">
                    <PortSearchInput
                      placeholder="Search destination port..."
                      value={addDestinationSearch}
                      onChange={(e) => {
                        setAddDestinationSearch(e.target.value);
                        if (!e.target.value) {
                          setAddDestinationPort(null);
                        }
                      }}
                      onFocus={() => {
                        if (addDestinationSearchResults.length > 0) {
                          setAddDestinationSearchOpen(true);
                        }
                      }}
                    />
                    {addDestinationSearchOpen && addDestinationSearchResults.length > 0 && (
                      <PortDropdown>
                        {addDestinationSearchResults.map((port) => (
                          <PortOption
                            key={port.id}
                            $selected={addDestinationPort?.id === port.id}
                            onClick={() => handleAddDestinationSelect(port)}
                          >
                            <PortOptionName>{formatPortDisplay(port)}</PortOptionName>
                            <PortOptionDetails>{port.city}, {port.country}</PortOptionDetails>
                          </PortOption>
                        ))}
                      </PortDropdown>
                    )}
                  </PortSearchWrapper>

                  <Select
                    value={addMode}
                    onChange={(e) => setAddMode(e.target.value as 'ocean' | 'air' | 'truck')}
                  >
                    <option value="ocean">Ocean</option>
                    <option value="air">Air</option>
                    <option value="truck">Truck</option>
                  </Select>

                  <Button
                    $variant="primary"
                    onClick={handleAddLane}
                    disabled={!canAdd}
                  >
                    Add
                  </Button>
                </FormRow>
              </AddForm>
              <Divider />

          {loading ? (
            <CardBody>
              <EmptyState>Loading...</EmptyState>
            </CardBody>
          ) : sortedLanes.length === 0 ? (
            <CardBody>
              <EmptyState>
                No trade lanes configured yet. Add your first trade lane above.
              </EmptyState>
            </CardBody>
          ) : (
            <>
              <FilterBar>
                <div style={{ flex: 1 }} />
                <FilterGroup>
                  <Select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value as 'origin' | 'destination' | 'mode')}
                    style={{ width: 140 }}
                    aria-label="Sort by"
                  >
                    <option value="origin">Sort by Origin</option>
                    <option value="destination">Sort by Destination</option>
                    <option value="mode">Sort by Mode</option>
                  </Select>
                  <Button
                    $variant="ghost"
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    aria-label={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
                  >
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </Button>
                </FilterGroup>
              </FilterBar>
              <List>
                {sortedLanes.map((lane) => (
                  <LaneRow key={lane.id}>
                    <LaneInfo>
                      <LaneRoute>
                        {formatPortDisplay(lane.originPort)} → {formatPortDisplay(lane.destinationPort)}
                      </LaneRoute>
                      <Tag tone="accent">{formatModeDisplay(lane.mode)}</Tag>
                    </LaneInfo>
                    <Button
                      $variant="ghost"
                      onClick={() => handleRemoveLane(lane.id)}
                    >
                      Remove
                    </Button>
                  </LaneRow>
                ))}
              </List>
            </>
          )}
        </Card>

        <Modal
          isOpen={isImportModalOpen}
          onClose={() => {
            setIsImportModalOpen(false);
            // Reset state when closing
            setUploadedFiles([]);
            setImportResults(null);
          }}
          title="Import Trade Lanes"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button
                $variant="ghost"
                onClick={() => {
                  setIsImportModalOpen(false);
                  setUploadedFiles([]);
                  setImportResults(null);
                }}
              >
                Close
              </Button>
            </div>
          }
        >
          <VStack $gap={16}>
            <FieldHint>
              Upload your shipment documents. We'll scan, parse, deduplicate, and automatically add trade lanes to your preferences.
            </FieldHint>

            <Dropzone
              $isDragging={isDragging}
              $hasFile={uploadedFiles.length > 0}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleDropzoneClick}
            >
              <DropzoneContent>
                <DropzoneIcon>📄</DropzoneIcon>
                <DropzoneText>
                  {isDragging ? 'Drop files here' : 'Drag and drop files here, or click to browse'}
                </DropzoneText>
                <DropzoneHint>
                  Supports PDF, images, and document files
                </DropzoneHint>
              </DropzoneContent>
            </Dropzone>

            <FileInput
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              multiple
              onChange={handleFileInputChange}
              aria-label="Upload shipment documents"
            />

            {uploadedFiles.length > 0 && (
              <FileList>
                {uploadedFiles.map((fileItem) => (
                  <FileItem key={fileItem.id}>
                    <FileName>{fileItem.file.name}</FileName>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {fileItem.status === 'processing' && (
                        <FileStatus $status="processing">Processing...</FileStatus>
                      )}
                      {fileItem.status === 'success' && (
                        <FileStatus $status="success">
                          ✓ {fileItem.lanesFound} lane{fileItem.lanesFound !== 1 ? 's' : ''} found
                        </FileStatus>
                      )}
                      {fileItem.status === 'error' && (
                        <FileStatus $status="error">
                          ✗ {fileItem.error || 'Error'}
                        </FileStatus>
                      )}
                      <Button
                        $variant="ghost"
                        onClick={() => handleRemoveFile(fileItem.id)}
                        style={{ padding: '4px 8px', fontSize: 12 }}
                      >
                        Remove
                      </Button>
                    </div>
                  </FileItem>
                ))}
              </FileList>
            )}

            {importResults && (
              <ImportResults>
                ✓ Import complete: {importResults.lanesAdded} new trade lane{importResults.lanesAdded !== 1 ? 's' : ''} added
                {importResults.duplicatesSkipped > 0 && (
                  <span>, {importResults.duplicatesSkipped} duplicate{importResults.duplicatesSkipped !== 1 ? 's' : ''} skipped</span>
                )}
              </ImportResults>
            )}
          </VStack>
        </Modal>
      </VStack>
    </SettingsPageLayout>
  );
}
