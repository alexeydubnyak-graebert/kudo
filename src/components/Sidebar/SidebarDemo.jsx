import { useState } from 'react';
import Sidebar from './Sidebar';

/**
 * SidebarDemo - Демонстрация компонента Sidebar
 */
const SidebarDemo = () => {
    const [activeSection, setActiveSection] = useState('my-files');
    const [activeItem, setActiveItem] = useState('kudo-storage');
    const [collapsed, setCollapsed] = useState(false);

    const handleNavigate = (sectionId, itemId = null) => {
        console.log('Navigate to:', sectionId, itemId);
        setActiveSection(sectionId);
        if (itemId) {
            setActiveItem(itemId);
        }
    };

    const handleCollapse = () => {
        setCollapsed(!collapsed);
        console.log('Sidebar collapsed:', !collapsed);
    };

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            background: 'var(--surface-page)'
        }}>
            {/* Sidebar */}
            <Sidebar
                activeSection={activeSection}
                activeItem={activeItem}
                collapsed={collapsed}
                onCollapse={handleCollapse}
                onNavigate={handleNavigate}
            />

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: '24px',
                overflowY: 'auto'
            }}>
                <h1 style={{
                    color: 'var(--text-primary)',
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '16px'
                }}>
                    Sidebar Demo
                </h1>

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    marginBottom: '24px'
                }}>
                    Демонстрация компонента Sidebar с использованием foundation-colors токенов и иконок из favourite-folders.
                </p>

                {/* Current State */}
                <div style={{
                    background: 'var(--panel-background)',
                    border: '1px solid var(--panel-border)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '24px'
                }}>
                    <h2 style={{
                        color: 'var(--panel-header-text)',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '12px'
                    }}>
                        Текущее состояние
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Активная секция: </span>
                            <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500' }}>
                                {activeSection}
                            </span>
                        </div>
                        <div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Активный элемент: </span>
                            <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500' }}>
                                {activeItem || '—'}
                            </span>
                        </div>
                        <div>
                            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Sidebar свернут: </span>
                            <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: '500' }}>
                                {collapsed ? 'Да' : 'Нет'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div style={{
                    background: 'var(--panel-background)',
                    border: '1px solid var(--panel-border)',
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '24px'
                }}>
                    <h2 style={{
                        color: 'var(--panel-header-text)',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '12px'
                    }}>
                        Возможности
                    </h2>

                    <ul style={{
                        color: 'var(--text-secondary)',
                        fontSize: '13px',
                        lineHeight: '1.6',
                        margin: 0,
                        paddingLeft: '20px'
                    }}>
                        <li>✅ Структура из Figma</li>
                        <li>✅ Foundation-colors токены</li>
                        <li>✅ Иконки из favourite-folders</li>
                        <li>✅ Раскрывающиеся секции</li>
                        <li>✅ Активные состояния</li>
                        <li>✅ Hover эффекты</li>
                        <li>✅ Плавные анимации</li>
                        <li>✅ Кнопка Collapse</li>
                        <li>✅ Footer с ссылками</li>
                    </ul>
                </div>

                {/* Tokens Used */}
                <div style={{
                    background: 'var(--panel-background)',
                    border: '1px solid var(--panel-border)',
                    borderRadius: '8px',
                    padding: '16px'
                }}>
                    <h2 style={{
                        color: 'var(--panel-header-text)',
                        fontSize: '16px',
                        fontWeight: '500',
                        marginBottom: '12px'
                    }}>
                        Используемые токены
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '12px',
                        fontSize: '12px',
                        fontFamily: 'monospace'
                    }}>
                        <TokenItem token="--sidebar-background" value="#141518" />
                        <TokenItem token="--sidebar-background-hover" value="#1E2023" />
                        <TokenItem token="--sidebar-background-active" value="#254CA8" />
                        <TokenItem token="--sidebar-text" value="#DADBDE" />
                        <TokenItem token="--sidebar-text-muted" value="#5B5D62" />
                        <TokenItem token="--sidebar-icon" value="#5B5D62" />
                        <TokenItem token="--sidebar-icon-active" value="#254CA8" />
                        <TokenItem token="--sidebar-border-right" value="#2A2C2F" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component
const TokenItem = ({ token, value }) => (
    <div style={{
        background: 'var(--surface-alt)',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid var(--border-subtle)'
    }}>
        <div style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
            {token}
        </div>
        <div style={{ color: 'var(--text-muted)' }}>
            {value}
        </div>
    </div>
);

export default SidebarDemo;
