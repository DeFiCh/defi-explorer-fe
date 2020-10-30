import React, { FormEvent, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { I18n } from 'react-redux-i18n';
import {
  Button,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Row,
} from 'reactstrap';
import styles from './SearchBarComponent.module.scss';

function SearchBarComponent() {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };
  return (
    <>
      <div className={styles.searchBar}>
        <Row className={styles.searchBarRow}>
          <Col xs={12}>
            <h1>{I18n.t('containers.homePage.searchBar.searchBarNotice')}</h1>
          </Col>
          <Col xs={12}>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Input
                  value={searchValue}
                  placeholder={I18n.t(
                    'containers.navBar.searchBar.searchPlaceHolderText'
                  )}
                  onChange={handleOnChange}
                />
                <InputGroupAddon addonType='append'>
                  <Button
                    color='link'
                    className='text-secondary'
                    onClick={handleSubmit}
                  >
                    <MdSearch />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default SearchBarComponent;
