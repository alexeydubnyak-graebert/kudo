import React, { useState } from 'react';
import Select from './Select';

/**
 * Select Examples
 * Примеры использования компонента Select
 */

// Примеры иконок
const FolderIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            d="M2 3H6L7 5H14V13H2V3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const FileIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            d="M9 2H4V14H12V5L9 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M9 2V5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path
            d="M2 14C2 11.7909 4.68629 10 8 10C11.3137 10 14 11.7909 14 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

// Примеры данных
const simpleOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' }
];

const optionsWithIcons = [
    { value: 'folder', label: 'Folder', icon: <FolderIcon /> },
    { value: 'file', label: 'File', icon: <FileIcon /> },
    { value: 'user', label: 'User', icon: <UserIcon /> }
];

const optionsWithDisabled = [
    { value: '1', label: 'Available Option 1' },
    { value: '2', label: 'Disabled Option', disabled: true },
    { value: '3', label: 'Available Option 2' },
    { value: '4', label: 'Another Disabled', disabled: true },
    { value: '5', label: 'Available Option 3' }
];

const manyOptions = Array.from({ length: 50 }, (_, i) => ({
    value: `option-${i + 1}`,
    label: `Option ${i + 1}`
}));

export const SelectExamples = () => {
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState('folder');
    const [value3, setValue3] = useState(null);
    const [value4, setValue4] = useState(null);
    const [value5, setValue5] = useState(null);
    const [value6, setValue6] = useState(null);
    const [value7, setValue7] = useState('2');

    return (
        <div style={{ padding: '40px', background: '#141518', minHeight: '100vh' }}>
            <div style={{ marginBottom: '20px' }}>
                <a
                    href="#"
                    style={{
                        color: '#254CA8',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 500
                    }}
                >
                    ← Back to File Browser
                </a>
            </div>

            <h1 style={{ color: '#fff', marginBottom: '40px' }}>Select Component Examples</h1>

            {/* BASIC SELECT */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>Basic Select</h2>
                <div style={{ maxWidth: '300px' }}>
                    <Select
                        options={simpleOptions}
                        value={value1}
                        onChange={setValue1}
                        placeholder="Choose an option..."
                    />
                </div>
                <p style={{ color: '#A7A9AD', fontSize: '12px', marginTop: '8px' }}>
                    Selected: {value1 || 'none'}
                </p>
            </section>

            {/* SELECT WITH ICONS */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>Select with Icons</h2>
                <div style={{ maxWidth: '300px' }}>
                    <Select
                        options={optionsWithIcons}
                        value={value2}
                        onChange={setValue2}
                        placeholder="Select type..."
                    />
                </div>
                <p style={{ color: '#A7A9AD', fontSize: '12px', marginTop: '8px' }}>
                    Selected: {value2}
                </p>
            </section>

            {/* SEARCHABLE SELECT */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>Searchable Select</h2>
                <div style={{ maxWidth: '300px' }}>
                    <Select
                        options={manyOptions}
                        value={value3}
                        onChange={setValue3}
                        placeholder="Search options..."
                        searchable
                    />
                </div>
                <p style={{ color: '#A7A9AD', fontSize: '12px', marginTop: '8px' }}>
                    Selected: {value3 || 'none'}
                </p>
            </section>

            {/* DISABLED OPTIONS */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>With Disabled Options</h2>
                <div style={{ maxWidth: '300px' }}>
                    <Select
                        options={optionsWithDisabled}
                        value={value4}
                        onChange={setValue4}
                        placeholder="Select..."
                    />
                </div>
                <p style={{ color: '#A7A9AD', fontSize: '12px', marginTop: '8px' }}>
                    Selected: {value4 || 'none'}
                </p>
            </section>

            {/* SIZES */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>Sizes</h2>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <p style={{ color: '#A7A9AD', fontSize: '12px', marginBottom: '8px' }}>Small</p>
                        <Select
                            options={simpleOptions}
                            value={value5}
                            onChange={setValue5}
                            placeholder="Small select..."
                            size="small"
                        />
                    </div>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <p style={{ color: '#A7A9AD', fontSize: '12px', marginBottom: '8px' }}>Medium (default)</p>
                        <Select
                            options={simpleOptions}
                            value={value6}
                            onChange={setValue6}
                            placeholder="Medium select..."
                            size="medium"
                        />
                    </div>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <p style={{ color: '#A7A9AD', fontSize: '12px', marginBottom: '8px' }}>Large</p>
                        <Select
                            options={simpleOptions}
                            value={value7}
                            onChange={setValue7}
                            placeholder="Large select..."
                            size="large"
                        />
                    </div>
                </div>
            </section>

            {/* STATES */}
            <section style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>States</h2>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <p style={{ color: '#A7A9AD', fontSize: '12px', marginBottom: '8px' }}>Disabled</p>
                        <Select
                            options={simpleOptions}
                            value="2"
                            placeholder="Disabled select..."
                            disabled
                        />
                    </div>
                    <div style={{ flex: '1', minWidth: '200px' }}>
                        <p style={{ color: '#A7A9AD', fontSize: '12px', marginBottom: '8px' }}>With Error</p>
                        <Select
                            options={simpleOptions}
                            value={null}
                            onChange={() => { }}
                            placeholder="Select required field..."
                            error="This field is required"
                        />
                    </div>
                </div>
            </section>

            {/* CODE EXAMPLES */}
            <section>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>Code Examples</h2>
                <pre
                    style={{
                        background: '#1E2023',
                        color: '#A7A9AD',
                        padding: '20px',
                        borderRadius: '4px',
                        overflow: 'auto'
                    }}
                >
                    {`// Basic Select
const [value, setValue] = useState(null);

<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
  value={value}
  onChange={setValue}
  placeholder="Choose..."
/>

// With Icons
<Select
  options={[
    { value: 'folder', label: 'Folder', icon: <FolderIcon /> },
    { value: 'file', label: 'File', icon: <FileIcon /> }
  ]}
  value={value}
  onChange={setValue}
/>

// Searchable
<Select
  options={manyOptions}
  value={value}
  onChange={setValue}
  searchable
/>

// With Disabled Options
<Select
  options={[
    { value: '1', label: 'Available' },
    { value: '2', label: 'Disabled', disabled: true }
  ]}
  value={value}
  onChange={setValue}
/>

// Sizes
<Select size="small" ... />
<Select size="medium" ... />
<Select size="large" ... />

// With Error
<Select
  error="This field is required"
  ...
/>

// Disabled
<Select disabled ... />`}
                </pre>
            </section>
        </div>
    );
};

export default SelectExamples;
