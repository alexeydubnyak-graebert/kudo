import { useState } from 'react';
import FileBrowser from './FileBrowser';

/**
 * FileBrowserDemo - Демонстрация компонента FileBrowser
 * Показывает использование foundation-colors токенов
 */
const FileBrowserDemo = () => {
    const [selectedId, setSelectedId] = useState(null);

    // Демо-данные
    const demoFiles = [
        {
            id: 1,
            name: 'Project Documentation.pdf',
            type: 'file',
            size: 2457600, // 2.4 MB
            modifiedAt: '2025-01-15T10:30:00',
            status: 'synced'
        },
        {
            id: 2,
            name: 'Design Assets',
            type: 'folder',
            size: null,
            modifiedAt: '2025-01-14T15:45:00',
            status: 'synced'
        },
        {
            id: 3,
            name: 'Budget 2025.xlsx',
            type: 'file',
            size: 524288, // 512 KB
            modifiedAt: '2025-01-13T09:15:00',
            status: 'warning'
        },
        {
            id: 4,
            name: 'Meeting Notes.docx',
            type: 'file',
            size: 102400, // 100 KB
            modifiedAt: '2025-01-12T14:20:00',
            status: 'synced'
        },
        {
            id: 5,
            name: 'Failed Upload.zip',
            type: 'file',
            size: 10485760, // 10 MB
            modifiedAt: '2025-01-11T16:00:00',
            status: 'error'
        },
        {
            id: 6,
            name: 'Shared Folder',
            type: 'folder',
            size: null,
            modifiedAt: '2025-01-10T11:30:00',
            status: 'info'
        },
        {
            id: 7,
            name: 'Presentation.pptx',
            type: 'file',
            size: 5242880, // 5 MB
            modifiedAt: '2025-01-09T13:45:00',
            status: 'synced'
        },
        {
            id: 8,
            name: 'Source Code',
            type: 'folder',
            size: null,
            modifiedAt: '2025-01-08T10:00:00',
            status: 'synced'
        }
    ];

    const handleFileSelect = (file) => {
        setSelectedId(file.id);
        console.log('Selected file:', file);
    };

    const handleFileDoubleClick = (file) => {
        console.log('Double clicked file:', file);
        if (file.type === 'folder') {
            alert(`Открытие папки: ${file.name}`);
        } else {
            alert(`Открытие файла: ${file.name}`);
        }
    };

    return (
        <div style={{
            padding: '24px',
            background: 'var(--surface-page)',
            minHeight: '100vh'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{
                    color: 'var(--text-primary)',
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '24px'
                }}>
                    File Browser Demo
                </h1>

                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    marginBottom: '24px'
                }}>
                    Демонстрация компонента файлового браузера с использованием foundation-colors токенов.
                    Кликните на файл для выбора, двойной клик для открытия.
                </p>

                <FileBrowser
                    files={demoFiles}
                    selectedId={selectedId}
                    onFileSelect={handleFileSelect}
                    onFileDoubleClick={handleFileDoubleClick}
                />

                {selectedId && (
                    <div style={{
                        marginTop: '24px',
                        padding: '16px',
                        background: 'var(--panel-background)',
                        border: '1px solid var(--panel-border)',
                        borderRadius: '8px'
                    }}>
                        <h3 style={{
                            color: 'var(--panel-header-text)',
                            fontSize: '14px',
                            fontWeight: '500',
                            margin: '0 0 8px 0'
                        }}>
                            Выбран файл ID: {selectedId}
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '13px',
                            margin: 0
                        }}>
                            {demoFiles.find(f => f.id === selectedId)?.name}
                        </p>
                    </div>
                )}

                {/* Color Palette Reference */}
                <div style={{ marginTop: '48px' }}>
                    <h2 style={{
                        color: 'var(--text-primary)',
                        fontSize: '18px',
                        fontWeight: '600',
                        marginBottom: '16px'
                    }}>
                        Foundation Colors Palette
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                        {/* Gray Scale */}
                        <ColorSwatch color="var(--foundation-gray900)" label="gray900" />
                        <ColorSwatch color="var(--foundation-gray800)" label="gray800" />
                        <ColorSwatch color="var(--foundation-gray700)" label="gray700" />
                        <ColorSwatch color="var(--foundation-gray600)" label="gray600" />
                        <ColorSwatch color="var(--foundation-gray500)" label="gray500" />
                        <ColorSwatch color="var(--foundation-gray400)" label="gray400" />
                        <ColorSwatch color="var(--foundation-gray300)" label="gray300" />
                        <ColorSwatch color="var(--foundation-gray200)" label="gray200" />

                        {/* Semantic */}
                        <ColorSwatch color="var(--foundation-primary)" label="primary" />
                        <ColorSwatch color="var(--semantic-success)" label="success" />
                        <ColorSwatch color="var(--semantic-warning)" label="warning" />
                        <ColorSwatch color="var(--semantic-error)" label="error" />
                        <ColorSwatch color="var(--semantic-info)" label="info" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper component for color swatches
const ColorSwatch = ({ color, label }) => (
    <div style={{
        padding: '12px',
        background: 'var(--panel-background)',
        border: '1px solid var(--panel-border)',
        borderRadius: '6px'
    }}>
        <div style={{
            width: '100%',
            height: '60px',
            background: color,
            borderRadius: '4px',
            marginBottom: '8px',
            border: '1px solid var(--border-subtle)'
        }} />
        <div style={{
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: '500'
        }}>
            {label}
        </div>
        <div style={{
            color: 'var(--text-muted)',
            fontSize: '11px',
            fontFamily: 'monospace'
        }}>
            {color}
        </div>
    </div>
);

export default FileBrowserDemo;
