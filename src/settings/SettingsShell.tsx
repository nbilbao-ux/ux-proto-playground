import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SETTINGS_NAV, type SettingsNavSection } from '@/settings/taxonomy';
import { searchSettingsFields, groupSearchResultsByPage, type SearchableField } from '@/settings/searchIndex';
import { Input, Muted, VStack } from '@/ui/primitives';

const Shell = styled.div`
  display: grid;
  grid-template-columns: 272px minmax(0, 1fr);
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  border-right: 1px solid var(--border);
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)),
                var(--bg);
  padding: 14px 12px;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: auto;
`;

const SidebarTop = styled.div`
  padding: 6px 8px 10px;
`;

const BackLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255,255,255,0.76);
  padding: 8px 10px;
  border-radius: 10px;

  &:hover { background: rgba(255,255,255,0.04); }
`;

const SectionLabel = styled.div`
  padding: 14px 10px 8px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.44);
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.82);

  &:hover { background: rgba(255,255,255,0.04); }

  &.active {
    background: rgba(106,167,255,0.16);
    border: 1px solid rgba(106,167,255,0.22);
  }
`;

const FieldMatchItem = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 8px 10px;
  border-radius: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.82);
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover { background: rgba(255,255,255,0.04); }

  .field-label {
    font-weight: 500;
    color: rgba(255,255,255,0.88);
  }

  .field-hint {
    font-size: 11px;
    color: rgba(255,255,255,0.56);
  }
`;

const FieldMatchContainer = styled.div`
  padding-left: 20px;
  margin-top: 4px;
`;

const Content = styled.main`
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background: var(--bg);
`;

function filterNavByQuery(nav: SettingsNavSection[], q: string): SettingsNavSection[] {
  const query = q.trim().toLowerCase();
  if (!query) return nav;

  return nav
    .map((section) => {
      const pages = section.pages.filter((p) => {
        const haystack = [p.label, ...(p.keywords ?? [])].join(' ').toLowerCase();
        return haystack.includes(query);
      });
      return { ...section, pages };
    })
    .filter((s) => s.pages.length > 0);
}

type SearchResult = {
  type: 'page' | 'field';
  pagePath: string;
  pageLabel: string;
  field?: SearchableField;
};

export function SettingsShell() {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get page-level matches (original search)
  const pageMatches = useMemo(() => filterNavByQuery(SETTINGS_NAV, query), [query]);
  
  // Get field-level matches (enhanced search)
  const fieldMatches = useMemo(() => {
    if (!query.trim()) return [];
    return searchSettingsFields(query);
  }, [query]);

  // Group field matches by page
  const fieldMatchesByPage = useMemo(() => {
    return groupSearchResultsByPage(fieldMatches);
  }, [fieldMatches]);

  // Combine results: pages that match at page level OR have field matches
  const allMatchingPages = useMemo(() => {
    const pagePaths = new Set<string>();
    
    // Add pages from page-level search
    pageMatches.forEach(section => {
      section.pages.forEach(page => pagePaths.add(page.path));
    });
    
    // Add pages from field-level search
    fieldMatchesByPage.forEach((_, path) => {
      pagePaths.add(path);
    });
    
    return Array.from(pagePaths);
  }, [pageMatches, fieldMatchesByPage]);

  // Build combined results
  const searchResults = useMemo(() => {
    if (!query.trim()) {
      // No query: show all pages in their sections
      return SETTINGS_NAV.map(section => ({
        section,
        pages: section.pages.map(page => ({
          page,
          fieldMatches: [] as SearchableField[],
        })),
      }));
    }

    // Build results from matching pages
    const results: Array<{
      section: SettingsNavSection;
      pages: Array<{
        page: { label: string; path: string; keywords?: string[] };
        fieldMatches: SearchableField[];
      }>;
    }> = [];

    SETTINGS_NAV.forEach(section => {
      const matchingPages: Array<{
        page: { label: string; path: string; keywords?: string[] };
        fieldMatches: SearchableField[];
      }> = [];

      section.pages.forEach(page => {
        if (allMatchingPages.includes(page.path)) {
          const fieldMatches = fieldMatchesByPage.get(page.path) || [];
          matchingPages.push({ page, fieldMatches });
        }
      });

      if (matchingPages.length > 0) {
        results.push({ section, pages: matchingPages });
      }
    });

    return results;
  }, [query, allMatchingPages, fieldMatchesByPage]);

  const activeLabel = useMemo(() => {
    const hit = SETTINGS_NAV.flatMap((s) => s.pages).find((p) => p.path === location.pathname);
    return hit?.label ?? 'Settings';
  }, [location.pathname]);

  const handleFieldMatchClick = (field: SearchableField) => {
    navigate(`${field.pagePath}?highlight=${field.fieldId}`);
  };

  return (
    <Shell>
      <Sidebar>
        <SidebarTop>
          <VStack $gap={10}>
            <BackLink to="/" end>
              <span aria-hidden="true">‹</span>
              <span>Back to app</span>
            </BackLink>
            <Input
              placeholder="Search settings…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search settings"
            />
          </VStack>
        </SidebarTop>

        {searchResults.map((result) => (
          <div key={result.section.label}>
            <SectionLabel>{result.section.label}</SectionLabel>
            <VStack $gap={4}>
              {result.pages.map(({ page, fieldMatches }) => (
                <div key={page.path}>
                  <NavItem to={page.path}>
                    <span>{page.label}</span>
                  </NavItem>
                  {fieldMatches.length > 0 && (
                    <FieldMatchContainer>
                      <VStack $gap={2}>
                        {fieldMatches.map((field) => (
                          <FieldMatchItem
                            key={field.fieldId}
                            onClick={() => handleFieldMatchClick(field)}
                            type="button"
                          >
                            <span className="field-label">{field.fieldLabel}</span>
                            {field.fieldHint && (
                              <span className="field-hint">{field.fieldHint}</span>
                            )}
                          </FieldMatchItem>
                        ))}
                      </VStack>
                    </FieldMatchContainer>
                  )}
                </div>
              ))}
            </VStack>
          </div>
        ))}

        {searchResults.length === 0 && query.trim() ? (
          <div style={{ padding: 12 }}>
            <Muted>No results for "{query.trim()}".</Muted>
          </div>
        ) : null}
      </Sidebar>
      <Content aria-label={activeLabel}>
        <Outlet />
      </Content>
    </Shell>
  );
}

