// Файловая система для демонстрации
import FloorPlanSvg from '../../../assets/drawings/floor-plan.svg?url';
import ElectricalSvg from '../../../assets/drawings/electrical.svg?url';
import ElevationSvg from '../../../assets/drawings/elevation.svg?url';
import SectionSvg from '../../../assets/drawings/section.svg?url';
import SitePlanSvg from '../../../assets/drawings/site-plan.svg?url';

// Mock viewers data
const mockViewers = [
    {
        id: 'user-1',
        name: 'Anna Schmidt',
        email: 'anna.schmidt@company.com',
        initials: 'AS',
        color: '#FF6B6B',
        status: 'editing',
        timestamp: '2 mins ago'
    },
    {
        id: 'user-2',
        name: 'John Davis',
        email: 'john.davis@company.com',
        initials: 'JD',
        color: '#4ECDC4',
        status: 'viewing',
        timestamp: '5 mins ago'
    },
    {
        id: 'user-3',
        name: 'Maria Garcia',
        email: 'maria.garcia@company.com',
        initials: 'MG',
        color: '#95E1D3',
        status: 'viewing',
        timestamp: '10 mins ago'
    }
];

export const fileSystemData = {
    'recents': {
        id: 'recents',
        name: 'Recents',
        type: 'folder',
        children: [],
        files: [
            {
                id: 'recent-file-1',
                type: 'file',
                name: 'Office Floor Plan.dwg',
                access: 'shared',
                modified: '2 hours ago',
                owner: 'me',
                size: 2883584, // 2.75 MB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: FloorPlanSvg,
                viewers: [mockViewers[0], mockViewers[1]],
                lastModified: '2024-11-24T10:30:00'
            },
            {
                id: 'recent-file-2',
                type: 'file',
                name: 'Electrical Scheme.dwg',
                access: 'shared',
                modified: '5 hours ago',
                owner: 'Sarah Chen',
                size: 1572864, // 1.5 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: ElectricalSvg,
                viewers: [mockViewers[2]],
                lastModified: '2024-11-24T07:15:00'
            },
            {
                id: 'recent-file-3',
                type: 'file',
                name: 'Building Front View.dwg',
                access: 'private',
                modified: '1 day ago',
                owner: 'me',
                size: 3407872, // 3.25 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: ElevationSvg,
                viewers: [mockViewers[0]],
                lastModified: '2024-11-23T16:45:00'
            },
            {
                id: 'recent-file-4',
                type: 'file',
                name: 'Construction Section.dwg',
                access: 'shared',
                modified: '2 days ago',
                owner: 'me',
                size: 2359296, // 2.25 MB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: SectionSvg,
                viewers: mockViewers,
                lastModified: '2024-11-22T11:20:00'
            },
            {
                id: 'recent-file-5',
                type: 'file',
                name: 'Campus Site Plan.dwg',
                access: 'shared',
                modified: '3 days ago',
                owner: 'John Davis',
                size: 4718592, // 4.5 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: SitePlanSvg,
                viewers: [mockViewers[1], mockViewers[2]],
                lastModified: '2024-11-21T13:00:00'
            },
            {
                id: 'recent-file-6',
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
                id: 'recent-file-7',
                type: 'file',
                name: 'Budget 2025.xlsx',
                access: 'private',
                modified: '1 week ago',
                owner: 'me',
                size: 102400, // 100 KB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO'
            }
        ]
    },
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
                id: 'file-root-1',
                type: 'file',
                name: 'Office Floor Plan.dwg',
                access: 'shared',
                modified: '2 weeks ago',
                owner: 'me',
                size: 2883584, // 2.75 MB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: FloorPlanSvg,
                viewers: [mockViewers[0], mockViewers[1]],
                lastModified: '2024-11-10T14:30:00'
            },
            {
                id: 'file-root-2',
                type: 'file',
                name: 'Electrical Scheme.dwg',
                access: 'shared',
                modified: '1 week ago',
                owner: 'Sarah Chen',
                size: 1572864, // 1.5 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: ElectricalSvg,
                viewers: [mockViewers[2]],
                lastModified: '2024-11-17T09:15:00'
            },
            {
                id: 'file-root-3',
                type: 'file',
                name: 'Building Front View.dwg',
                access: 'private',
                modified: '4 days ago',
                owner: 'me',
                size: 3407872, // 3.25 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: ElevationSvg,
                viewers: [mockViewers[0]],
                lastModified: '2024-11-20T16:45:00'
            },
            {
                id: 'file-root-4',
                type: 'file',
                name: 'Construction Section.dwg',
                access: 'shared',
                modified: '3 days ago',
                owner: 'me',
                size: 2359296, // 2.25 MB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: SectionSvg,
                viewers: mockViewers,
                lastModified: '2024-11-21T11:20:00'
            },
            {
                id: 'file-root-5',
                type: 'file',
                name: 'Campus Site Plan.dwg',
                access: 'shared',
                modified: '5 days ago',
                owner: 'John Davis',
                size: 4718592, // 4.5 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: SitePlanSvg,
                viewers: [mockViewers[1], mockViewers[2]],
                lastModified: '2024-11-19T13:00:00'
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
            },
            {
                id: 'file-dwg-1',
                type: 'file',
                name: 'Floor Plan A1.dwg',
                access: 'shared',
                modified: '1 week ago',
                owner: 'me',
                size: 2621440, // 2.5 MB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: FloorPlanSvg,
                viewers: mockViewers,
                lastModified: '2024-11-17T10:30:00'
            },
            {
                id: 'file-dwg-2',
                type: 'file',
                name: 'Electrical Layout.dwg',
                access: 'shared',
                modified: '3 days ago',
                owner: 'Sarah Chen',
                size: 1835008, // 1.75 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: ElectricalSvg,
                viewers: [mockViewers[0]],
                lastModified: '2024-11-21T14:15:00'
            },
            {
                id: 'file-dwg-3',
                type: 'file',
                name: 'Building Elevation.dwg',
                access: 'private',
                modified: '5 days ago',
                owner: 'me',
                size: 3145728, // 3 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: ElevationSvg,
                viewers: [mockViewers[1], mockViewers[2]],
                lastModified: '2024-11-19T09:45:00'
            },
            {
                id: 'file-dwg-4',
                type: 'file',
                name: 'Section Detail.dwg',
                access: 'shared',
                modified: '2 days ago',
                owner: 'me',
                size: 2097152, // 2 MB
                isFavorite: true,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: SectionSvg,
                viewers: [mockViewers[0], mockViewers[1]],
                lastModified: '2024-11-22T16:20:00'
            },
            {
                id: 'file-dwg-5',
                type: 'file',
                name: 'Site Plan Master.dwg',
                access: 'shared',
                modified: '1 day ago',
                owner: 'John Davis',
                size: 4194304, // 4 MB
                isFavorite: false,
                storageId: 'kudo',
                storageType: 'KUDO',
                thumbnail: SitePlanSvg,
                viewers: mockViewers,
                lastModified: '2024-11-23T11:00:00'
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
