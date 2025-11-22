// Файловая система для демонстрации
export const fileSystemData = {
    'root': {
        id: 'root',
        name: 'My files',
        type: 'folder',
        children: [
            {
                id: 'projects',
                name: 'Projects',
                type: 'folder',
                modified: '2 weeks ago',
                owner: 'me',
                size: '8 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'documents',
                name: 'Documents',
                type: 'folder',
                modified: '1 month ago',
                owner: 'me',
                size: '15 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'shared',
                name: 'Shared with me',
                type: 'shared-folder',
                modified: '3 days ago',
                owner: 'Team',
                size: '4 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'archives',
                name: 'Archives',
                type: 'folder',
                modified: '6 months ago',
                owner: 'me',
                size: '12 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ],
        files: [
            {
                id: 'file-1',
                type: 'file',
                name: 'Playground.dwg',
                access: 'shared',
                modified: '2 years ago',
                owner: 'me',
                size: 3145728, // 3 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'file-2',
                type: 'file',
                name: 'README.pdf',
                access: 'private',
                modified: '1 month ago',
                owner: 'me',
                size: 251658, // 245 KB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ]
    },
    'projects': {
        id: 'projects',
        name: 'Projects',
        type: 'folder',
        children: [
            {
                id: 'project-documents',
                name: 'Project Documents',
                type: 'folder',
                modified: '1 week ago',
                owner: 'me',
                size: '15 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'design-files',
                name: 'Design Files',
                type: 'shared-folder',
                modified: '3 days ago',
                owner: 'Sarah Chen',
                size: '8 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'technical',
                name: 'Technical Drawings',
                type: 'folder',
                modified: '5 days ago',
                owner: 'me',
                size: '23 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'presentations',
                name: 'Presentations',
                type: 'folder',
                modified: '2 weeks ago',
                owner: 'me',
                size: '6 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ],
        files: [
            {
                id: 'file-3',
                type: 'file',
                name: 'Project Plan.docx',
                access: 'shared',
                modified: '1 week ago',
                owner: 'me',
                size: 524288, // 512 KB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'file-4',
                type: 'file',
                name: 'Budget 2025.xlsx',
                access: 'private',
                modified: '3 days ago',
                owner: 'me',
                size: 102400, // 100 KB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'file-5',
                type: 'file',
                name: 'Meeting Notes.txt',
                access: 'private',
                modified: '2 days ago',
                owner: 'me',
                size: 8192, // 8 KB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ]
    },
    'documents': {
        id: 'documents',
        name: 'Documents',
        type: 'folder',
        children: [
            {
                id: 'personal',
                name: 'Personal',
                type: 'folder',
                modified: '2 weeks ago',
                owner: 'me',
                size: '8 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'work',
                name: 'Work',
                type: 'folder',
                modified: '1 week ago',
                owner: 'me',
                size: '12 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ],
        files: [
            {
                id: 'file-6',
                type: 'file',
                name: 'Resume.pdf',
                access: 'private',
                modified: '1 month ago',
                owner: 'me',
                size: 204800, // 200 KB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'file-7',
                type: 'file',
                name: 'Contract.docx',
                access: 'shared',
                modified: '2 weeks ago',
                owner: 'me',
                size: 307200, // 300 KB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ]
    },
    'shared': {
        id: 'shared',
        name: 'Shared with me',
        type: 'shared-folder',
        children: [
            {
                id: 'team-resources',
                name: 'Team Resources',
                type: 'shared-folder',
                modified: '1 day ago',
                owner: 'John Doe',
                size: '20 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ],
        files: [
            {
                id: 'file-8',
                type: 'file',
                name: 'Team Guidelines.pdf',
                access: 'shared',
                modified: '3 days ago',
                owner: 'John Doe',
                size: 1048576, // 1 MB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO'
            },
            {
                id: 'file-9',
                type: 'file',
                name: 'Q4 Report.xlsx',
                access: 'shared',
                modified: '1 week ago',
                owner: 'Sarah Chen',
                size: 409600, // 400 KB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ]
    },
    'archives': {
        id: 'archives',
        name: 'Archives',
        type: 'folder',
        children: [
            {
                id: 'old-projects',
                name: 'Old Projects',
                type: 'folder',
                modified: '1 year ago',
                owner: 'me',
                size: '45 items',
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ],
        files: [
            {
                id: 'file-10',
                type: 'file',
                name: 'Archive 2023.zip',
                access: 'private',
                modified: '6 months ago',
                owner: 'me',
                size: 10485760, // 10 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ]
    }
};

// Функция для получения содержимого папки
export const getFolderContents = (folderId = 'root') => {
    const folder = fileSystemData[folderId];
    if (!folder) return { folders: [], files: [] };

    return {
        folders: folder.children || [],
        files: folder.files || []
    };
};

// Функция для получения всех элементов папки (папки + файлы)
export const getAllItems = (folderId = 'root') => {
    const { folders, files } = getFolderContents(folderId);
    return [...folders, ...files];
};
