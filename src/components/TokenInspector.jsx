import { useState, useEffect } from 'react';
import './TokenInspector.css';

/**
 * Компонент для инспекции цепочки наследования токенов
 * Показывает, как токены ссылаются друг на друга
 */
export function TokenInspector() {
  const [tokenChain, setTokenChain] = useState([]);

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);

    // Примеры цепочек наследования
    const chains = [
      {
        component: 'Button Background',
        brandToken: '--kudo-button-bg-standard',
        globalToken: '--states-bg-secondary-standard',
      },
      {
        component: 'Button Text',
        brandToken: '--kudo-button-text-standard',
        globalToken: '--states-text-color-standard',
      },
      {
        component: 'Button Border',
        brandToken: '--kudo-button-border-standard',
        globalToken: '--states-border-secondary-standard',
      },
      {
        component: 'Ribbon Background',
        brandToken: '--kudo-ribbon-item-bg-standard',
        globalToken: '--states-bg-secondary-standard',
      },
    ];

    const resolvedChains = chains.map(chain => ({
      ...chain,
      brandValue: styles.getPropertyValue(chain.brandToken).trim(),
      globalValue: styles.getPropertyValue(chain.globalToken).trim(),
      computedValue: styles.getPropertyValue(chain.brandToken).trim(),
    }));

    setTokenChain(resolvedChains);
  }, []);

  return (
    <div className="token-inspector">
      <h3>🔍 Инспектор цепочки токенов</h3>
      <p className="inspector-description">
        Демонстрация трехуровневой архитектуры с переиспользованием
      </p>

      <div className="chains-grid">
        {tokenChain.map((chain, index) => (
          <div key={index} className="chain-card">
            <div className="chain-header">
              <strong>{chain.component}</strong>
            </div>

            <div className="chain-level">
              <span className="level-label">Уровень 3: Компонент</span>
              <code className="token-name">.kudo-button</code>
            </div>

            <div className="chain-arrow">↓ использует</div>

            <div className="chain-level">
              <span className="level-label">Уровень 2: Токен бренда</span>
              <code className="token-name">{chain.brandToken}</code>
              <div className="token-reference">
                = var({chain.globalToken})
              </div>
            </div>

            <div className="chain-arrow">↓ ссылается на</div>

            <div className="chain-level">
              <span className="level-label">Уровень 1: Глобальный токен</span>
              <code className="token-name">{chain.globalToken}</code>
              <div className="token-value">
                <div 
                  className="color-preview" 
                  style={{ backgroundColor: chain.globalValue }}
                />
                <span>{chain.globalValue}</span>
              </div>
            </div>

            <div className="chain-result">
              <strong>Результат:</strong>
              <div className="result-preview">
                <div 
                  className="color-preview large" 
                  style={{ backgroundColor: chain.computedValue }}
                />
                <code>{chain.computedValue}</code>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="inspector-note">
        <strong>💡 Преимущество:</strong> При переключении темы меняются только 
        глобальные токены (Уровень 1), а все остальное обновляется автоматически 
        через цепочку ссылок var().
      </div>
    </div>
  );
}
