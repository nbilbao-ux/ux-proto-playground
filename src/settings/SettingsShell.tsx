import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { SETTINGS_NAV, type SettingsNavSection } from '@/settings/taxonomy';
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

export function SettingsShell() {
  const [query, setQuery] = useState('');
  const location = useLocation();

  const filtered = useMemo(() => filterNavByQuery(SETTINGS_NAV, query), [query]);

  const activeLabel = useMemo(() => {
    const hit = SETTINGS_NAV.flatMap((s) => s.pages).find((p) => p.path === location.pathname);
    return hit?.label ?? 'Settings';
  }, [location.pathname]);

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

        {filtered.map((section) => (
          <div key={section.label}>
            <SectionLabel>{section.label}</SectionLabel>
            <VStack $gap={4}>
              {section.pages.map((page) => (
                <NavItem key={page.path} to={page.path}>
                  <span>{page.label}</span>
                </NavItem>
              ))}
            </VStack>
          </div>
        ))}

        {filtered.length === 0 ? (
          <div style={{ padding: 12 }}>
            <Muted>No results for “{query.trim()}”.</Muted>
          </div>
        ) : null}
      </Sidebar>
      <Content aria-label={activeLabel}>
        <Outlet />
      </Content>
    </Shell>
  );
}

