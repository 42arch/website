import { BottomPanel } from './bottom-panel'
import { CommandPalette } from './command-palette'
import { ExplorerSidebar } from './explorer-sidebar'
import { StatusBar } from './status-bar'
import { TabBar } from './tab-bar'
import { Toolbar } from './toolbar'
import { WorkspaceContent } from './workspace-content'

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {/* Top Toolbar */}
      <Toolbar />

      {/* Main Body: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Explorer Sidebar */}
        <ExplorerSidebar />

        {/* Content Area: Tabs + Main + Bottom */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Tab Bar */}
          <TabBar />

          {/* Main Workspace */}
          <WorkspaceContent>{children}</WorkspaceContent>

          {/* Bottom Activity Panel */}
          <BottomPanel />
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar />

      {/* Command Palette Overlay */}
      <CommandPalette />
    </div>
  )
}
