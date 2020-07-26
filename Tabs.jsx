import React, { useState, createContext, useContext, Children } from 'react';

// Naive version all the things in one component

const Tabs = ({ data, tabPosition = 'top', disbaled = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = (
    <div className="tab-list">
      {data.map((tab, index) => {
        const isActive = index === activeIndex;
        const isDisbaled = disbaled.includes(index);

        return (
          <div
            className={`tab ${
              isDisbaled ? 'disbaled' : isActive ? 'active' : ''
            }`}
            onClick={isDisbaled ? undefined : () => setActiveIndex(index)}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );

  const panels = <div className="panels">{data[activeIndex].content}</div>;

  return (
    <div className="tabs">
      {tabPosition === 'bottom' ? [panels, tabs] : [tabs, panels]}
    </div>
  );
};

const tabData = [
  { label: 'Login', content: <LoginForm /> },
  { label: 'Signup', content: <SignupForm /> },
];

// <Tabs data={tabData} disabled={[1]} />

// Lego blocks

const TabsContext = createContext();

const Tabs = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>;
    </TabsContext.Provider>
  );
};

const TabListContext = createContext();

const TabList = ({ children }) => {
  return (
    <div className="tab-list">
      {Children.map(children, (child, index) => (
        <TabListContext.Provider value={{ index }}>
          {child}
        </TabListContext.Provider>
      ))}
    </div>
  );
};

const Tab = ({ children, disbaled }) => {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const { index } = useContext(TabListContext);
  const isActive = index === activeIndex;

  return (
    <div
      className={`tab ${disbaled ? 'disbaled' : isActive ? 'active' : ''}`}
      onClick={disbaled ? undefined : () => setActiveIndex(index)}
    >
      {children}
    </div>
  );
};

const TabPanels = ({ children }) => {
  const { activeIndex } = useContext(TabsContext);

  // return {Children.toArray(children)[activeIndex]}
};

const TabPanel = ({ children }) => {
  return { children };
};

<Tabs>
  <TabList>
    <Tab>Login</Tab>
    <Tab disbaled>Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <LoginForm />
    </TabPanel>
    <TabPanel>
      <SignupForm />
    </TabPanel>
  </TabPanels>
</Tabs>;

const DataTabs = ({ data, disbaled = [], tabPosition = 'top' }) => {
  const tabs = (
    <TabList>
      {data.map((item, index) => {
        <Tab disbaled={disbaled.includes(index)} key={index}>
          {item.label}
        </Tab>;
      })}
    </TabList>
  );

  const panels = (
    <TabPanels>
      {data.map((item, index) => (
        <TabPanel key={index}>{item.content}</TabPanel>
      ))}
    </TabPanels>
  );

  return (
    <Tabs>{tabPosition === 'bottom' ? [panels, tabs] : [tabs, pannels]}</Tabs>
  );
};

<DataTabs data={tabData} position="bottom" disabled={[1]} />;
