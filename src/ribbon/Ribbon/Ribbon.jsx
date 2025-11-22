import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RibbonSection from '../RibbonSection/RibbonSection';
import { loadRibbonConfig } from '../../utils/ribbonConfigParser';
import './Ribbon.css';

/**
 * Ribbon - Главный компонент ленты интерфейса
 * Загружает конфигурацию из XML и отображает секции
 */
const Ribbon = ({ configPath, theme = 'light' }) => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadConfig = async () => {
            try {
                setLoading(true);
                const ribbonConfig = await loadRibbonConfig(configPath);
                setConfig(ribbonConfig);
                setError(null);
            } catch (err) {
                console.error('Failed to load ribbon configuration:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadConfig();
    }, [configPath]);

    if (loading) {
        return (
            <div className="ribbon ribbon--loading">
                <div className="ribbon__loading-message">Loading ribbon...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ribbon ribbon--error">
                <div className="ribbon__error-message">
                    Failed to load ribbon: {error}
                </div>
            </div>
        );
    }

    if (!config || !config.sections) {
        return null;
    }

    return (
        <div className="ribbon">
            {config.sections.map((section, index) => (
                <RibbonSection
                    key={index}
                    name={section.name}
                    rows={section.rows}
                    theme={theme}
                />
            ))}
        </div>
    );
};

Ribbon.propTypes = {
    configPath: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['light', 'dark'])
};

export default Ribbon;
