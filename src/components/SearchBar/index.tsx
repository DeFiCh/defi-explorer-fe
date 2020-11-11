import React from 'react';
import { MdClose, MdSearch } from 'react-icons/md';
import {
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
} from 'reactstrap';
import classnames from 'classnames';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  searching: any;
  toggleSearch: any;
  formGroupClass?: string;
  onChange: (e) => void;
  placeholder?: string;
  mobileView?: boolean;
  onSubmit: (actions?: boolean) => void;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = (
  props: SearchBarProps
) => {
  return (
    <div
      className={classnames({ 'd-block': props.searching }, styles.searchBar)}
    >
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit();
        }}
      >
        <FormGroup className={`row ${props.formGroupClass || ''} `}>
          <Col>
            <InputGroup>
              <Input
                type='text'
                placeholder={props.placeholder}
                name='searchInput'
                id='searchInput'
                onChange={props.onChange}
              />
              {!props.mobileView && (
                <MdSearch className={styles.searchIndicator} />
              )}
              <InputGroupAddon addonType='append'>
                <Button
                  color='outline-primary'
                  onClick={(e) => {
                    if (props.mobileView) {
                      return props.onSubmit();
                    }
                    return props.toggleSearch(e);
                  }}
                >
                  {props.mobileView ? <MdSearch /> : <MdClose />}
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default SearchBar;
