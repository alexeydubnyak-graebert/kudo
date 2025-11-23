import React from 'react';
import Button from './Button';

/**
 * Button Examples
 * Примеры использования компонента Button
 */

// Пример иконки (можно заменить на реальные SVG)
const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const DownloadIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2V10M8 10L5 7M8 10L11 7M2 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SearchIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M10 10L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const ButtonExamples = () => {
    return (
        <div style={{ padding: '40px', background: 'var(--surface-page)', minHeight: '100vh' }}>
            <div style={{ marginBottom: '20px' }}>
                <a
                    href="#"
                    style={{
                        color: 'var(--foundation-primary)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 500
                    }}
                >
                    ← Back to File Browser
                </a>
            </div>
            <h1 style={{ color: 'var(--text-primary)', marginBottom: '40px' }}>Button Component Examples</h1>

            {/* PRIMARY BUTTONS */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Primary Buttons</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Button variant="primary">
                        Default
                    </Button>

                    <Button variant="primary" iconPosition="left" icon={<PlusIcon />}>
                        Icon Left
                    </Button>

                    <Button variant="primary" iconPosition="right" icon={<DownloadIcon />}>
                        Icon Right
                    </Button>

                    <Button variant="primary" iconPosition="only" icon={<SearchIcon />} />

                    <Button variant="primary" disabled>
                        Disabled
                    </Button>
                </div>
            </section>

            {/* SECONDARY BUTTONS */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>Secondary Buttons</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Button variant="secondary">
                        Default
                    </Button>

                    <Button variant="secondary" iconPosition="left" icon={<PlusIcon />}>
                        Icon Left
                    </Button>

                    <Button variant="secondary" iconPosition="right" icon={<DownloadIcon />}>
                        Icon Right
                    </Button>

                    <Button variant="secondary" iconPosition="only" icon={<SearchIcon />} />

                    <Button variant="secondary" disabled>
                        Disabled
                    </Button>
                </div>
            </section>

            {/* SIZES */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>Sizes (optional)</h2>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button variant="primary" className="button--small">
                        Small
                    </Button>

                    <Button variant="primary">
                        Default
                    </Button>

                    <Button variant="primary" className="button--large">
                        Large
                    </Button>
                </div>
            </section>

            {/* USAGE EXAMPLES */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>Usage Examples</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Button
                        variant="primary"
                        iconPosition="left"
                        icon={<PlusIcon />}
                        onClick={() => alert('Create clicked!')}
                    >
                        Create New
                    </Button>

                    <Button
                        variant="secondary"
                        iconPosition="left"
                        icon={<DownloadIcon />}
                        onClick={() => alert('Download clicked!')}
                    >
                        Download
                    </Button>

                    <Button
                        variant="secondary"
                        iconPosition="only"
                        icon={<SearchIcon />}
                        onClick={() => alert('Search clicked!')}
                    />
                </div>
            </section>

            {/* CODE EXAMPLES */}
            <section>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Code Examples</h2>
                <pre style={{
                    background: 'var(--surface-base)',
                    color: 'var(--text-secondary)',
                    padding: '20px',
                    borderRadius: '4px',
                    overflow: 'auto'
                }}>
                    {`// Default (без иконки)
<Button variant="primary">
  Click Me
</Button>

// Icon Left
<Button variant="primary" iconPosition="left" icon={<PlusIcon />}>
  Create New
</Button>

// Icon Right
<Button variant="primary" iconPosition="right" icon={<DownloadIcon />}>
  Download
</Button>

// Icon Only
<Button variant="primary" iconPosition="only" icon={<SearchIcon />} />

// Secondary
<Button variant="secondary">
  Cancel
</Button>

// Disabled
<Button variant="primary" disabled>
  Disabled
</Button>

// With onClick
<Button 
  variant="primary" 
  onClick={() => console.log('clicked')}
>
  Click Me
</Button>`}
                </pre>
            </section>
        </div>
    );
};

export default ButtonExamples;
