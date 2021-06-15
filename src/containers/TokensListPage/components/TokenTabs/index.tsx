import React, { useState } from 'react';
import { Card, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import { I18n } from 'react-redux-i18n';
import { PAIRS, TOKEN_RICH_LIST } from '../../../../constants';
import PoolPairsTable from '../../../PoolPairsListPage/components/PoolPairsTable';
import TokenRichListPage from '../TokenRichListPage';
import styles from '../../TokensListPage.module.scss';

interface TokenTabsProps {
  data: any;
  tokenId: string | number;
}

const TokenTabs: React.FunctionComponent<TokenTabsProps> = (
  props: TokenTabsProps
) => {
  const { data, tokenId } = props;
  const [activeTab, setActiveTab] = useState<string>(PAIRS);

  return (
    <div>
      {/* <Nav pills>
        <Card className={`mr-2 ${styles.tokenTab}`}>
          <NavItem>
            <NavLink
              className={classnames({
                active: activeTab === PAIRS,
              })}
              onClick={() => {
                setActiveTab(PAIRS);
              }}
            >
              {I18n.t('containers.tokenPage.pairs')}
            </NavLink>
          </NavItem>
        </Card>
        {false && (
          <Card className={`mr-2 ${styles.tokenTab}`}>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === TOKEN_RICH_LIST,
                })}
                onClick={() => {
                  setActiveTab(TOKEN_RICH_LIST);
                }}
              >
                {I18n.t('containers.tokenPage.tokenRichList')}
              </NavLink>
            </NavItem>
          </Card>
        )}
      </Nav> */}
      <div className='mt-5'>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={PAIRS}>
            <h1>{I18n.t('containers.tokenPage.pairsHeading')}</h1>
            <PoolPairsTable tokenId={data.tokenId} />
          </TabPane>
          <TabPane tabId={TOKEN_RICH_LIST}>
            {tokenId && (
              <TokenRichListPage tokenId={tokenId} unit={data.symbolKey} />
            )}
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default TokenTabs;
