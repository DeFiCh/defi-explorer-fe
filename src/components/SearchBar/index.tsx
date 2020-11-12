import React from 'react';
import { MdClose, MdSearch } from 'react-icons/md';
import {
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
  onChange: (event) => void;
  placeholder?: string;
  onSubmit: (event) => void;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = (
  props: SearchBarProps
) => {
  return (
    <Form onSubmit={props.onSubmit}>
      <FormGroup className={props.formGroupClass}>
        <InputGroup>
          <Input
            autoFocus
            type='text'
            placeholder={props.placeholder}
            name='searchInput'
            id='searchInput'
            onChange={props.onChange}
          />
          <MdSearch className={styles.searchIndicator} />
          <InputGroupAddon addonType='append'>
            <Button color='outline-primary' onClick={props.toggleSearch}>
              <MdClose />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export default SearchBar;
