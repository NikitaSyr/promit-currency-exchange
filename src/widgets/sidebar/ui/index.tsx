import React from 'react';
import { Col } from 'antd';
import { NavLink } from 'react-router-dom';

import styles from './index.module.css';

export const Sidebar = () => {
    return (
        <Col className={styles['sidebar']}>
            <NavLink to={'/converse'}>Конвертер</NavLink>
        </Col>
    );
};