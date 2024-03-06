export interface ToggleTabsTypes {
  _type: any;
  tabs: Tabs[]
}

export interface Tabs {
  title: string
  tabItems: TabItems[]
}
export interface TabItems {
  tabItems: TabItems[]
}
