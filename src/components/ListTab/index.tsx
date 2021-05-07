import React, { useState } from 'react';
import { Card, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import styles from './ListTab.module.scss';

interface ListTabsProps {
  id: string | number;
  tab1Key: string;
  tab2Key: string;
  tab1Label: string;
  tab2Label: string;
  tab1Component: () => React.ReactNode;
  tab2Component: () => React.ReactNode;
}

const ListTabs: React.FunctionComponent<ListTabsProps> = (
  props: ListTabsProps
) => {
  const {
    id,
    tab1Key,
    tab2Key,
    tab1Component,
    tab2Component,
    tab1Label,
    tab2Label,
  } = props;
  const [activeTab, setActiveTab] = useState<string>(tab1Key);

  return (
    <div>
      <Nav pills>
        <Card className={`mr-2 ${styles.tokenTab}`}>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === tab1Key,
              })}
              onClick={() => {
                setActiveTab(tab1Key);
              }}
            >
              {tab1Label}
            </NavLink>
          </NavItem>
        </Card>
        {id && (
          <Card className={`mr-2 ${styles.tokenTab}`}>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === tab2Key,
                })}
                onClick={() => {
                  setActiveTab(tab2Key);
                }}
              >
                {tab2Label}
              </NavLink>
            </NavItem>
          </Card>
        )}
      </Nav>
      <div className='mt-5'>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={tab1Key}>{tab1Component()}</TabPane>
          <TabPane tabId={tab2Key}>{tab2Component()}</TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default ListTabs;
