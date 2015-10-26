import './main.css';
import 'babel-core/polyfill';
import React from 'react';
import {render} from 'react-dom';
import Root from './redux/root';

const root = document.createElement('div');
document.body.appendChild(root);

render(<Root/>, root);
