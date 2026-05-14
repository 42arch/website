'use client'

import { useEffect } from 'react'
import { Panel, Group, Separator } from 'react-resizable-panels'
import { useWorkspaceStore } from '@/store/workspace'
import { BottomPanel } from './bottom-panel'
import { CommandPalette } from './command-palette'
import { ExplorerSidebar } from './explorer-sidebar'
import { StatusBar } from './status-bar'
import { TabBar } from './tab-bar'
import { Toolbar } from './toolbar'
import { WorkspaceContent } from './workspace-content'

function MainContentGroup({ children }: { children: React.ReactNode }) {
  const { bottomPanelOpen, setBottomPanelHeight } = useWorkspaceStore()
  
  return (
    <Group orientation="vertical" id="os-content-layout-v3">
      {/* Content Panel */}
      <Panel minSize={100}>
        <div className="flex h-full flex-col overflow-hidden border-l border-os-border">
          <TabBar />
          <WorkspaceContent>{children}</WorkspaceContent>
        </div>
      </Panel>

      {/* Activity Panel */}
      {bottomPanelOpen && (
        <>
          <Separator className="relative flex h-[1px] items-center justify-center bg-os-border transition-colors hover:bg-os-accent/50 group cursor-row-resize">
            <div className="absolute w-8 h-1 rounded-full bg-os-border group-hover:bg-os-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Separator>
          <Panel 
            defaultSize={200} 
            minSize={40} 
            maxSize={800}
            onResize={(size) => setBottomPanelHeight(size.inPixels)}
          >
            <div className="h-full border-l border-os-border">
              <BottomPanel />
            </div>
          </Panel>
        </>
      )}
    </Group>
  )
}

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const { 
    sidebarPosition, 
    sidebarOpen, 
    setSidebarWidth,
    themePreset
  } = useWorkspaceStore()

  // Sync theme preset with DOM
  useEffect(() => {
    if (['folio-dark', 'folio-light'].includes(themePreset)) {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', themePreset)
    }
  }, [themePreset])

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Top Toolbar */}
      <Toolbar />

      {/* Main Body */}
      <div className="flex-1 overflow-hidden">
        <Group 
          orientation="horizontal" 
          id="os-main-layout-v4" 
        >
          {sidebarPosition === 'left' ? (
            <>
              {/* Sidebar Panel (Left) */}
              {sidebarOpen && (
                <>
                  <Panel 
                    defaultSize={240} 
                    minSize={160} 
                    maxSize={600}
                    onResize={(size) => setSidebarWidth(size.inPixels)}
                  >
                    <ExplorerSidebar />
                  </Panel>
                  <Separator className="relative flex w-[1px] items-center justify-center bg-os-border transition-colors hover:bg-os-accent/50 group cursor-col-resize">
                    <div className="absolute h-8 w-1 rounded-full bg-os-border group-hover:bg-os-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Separator>
                </>
              )}

              {/* Main Content Area */}
              <Panel>
                <MainContentGroup children={children} />
              </Panel>
            </>
          ) : (
            <>
              {/* Main Content Area */}
              <Panel>
                <MainContentGroup children={children} />
              </Panel>

              {/* Sidebar Panel (Right) */}
              {sidebarOpen && (
                <>
                  <Separator className="relative flex w-[1px] items-center justify-center bg-os-border transition-colors hover:bg-os-accent/50 group cursor-col-resize">
                    <div className="absolute h-8 w-1 rounded-full bg-os-border group-hover:bg-os-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Separator>
                  <Panel 
                    defaultSize={240} 
                    minSize={160} 
                    maxSize={600}
                    onResize={(size) => setSidebarWidth(size.inPixels)}
                  >
                    <ExplorerSidebar />
                  </Panel>
                </>
              )}
            </>
          )}
        </Group>
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Command Palette Overlay */}
      <CommandPalette />
    </div>
  )
}
