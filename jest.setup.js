import { configure } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';

configure({ adapter: new Adapter() });

const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
