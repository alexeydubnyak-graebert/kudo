import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    // Инициализируем favorite folders из localStorage
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favoriteFolders');
        if (savedFavorites) {
            try {
                return JSON.parse(savedFavorites);
            } catch (error) {
                console.error('Error loading favorites:', error);
                return [];
            }
        }
        return [];
    });

    // Инициализируем favorite files из localStorage
    const [favoriteFiles, setFavoriteFiles] = useState(() => {
        const savedFiles = localStorage.getItem('favoriteFiles');
        if (savedFiles) {
            try {
                return JSON.parse(savedFiles);
            } catch (error) {
                console.error('Error loading favorite files:', error);
                return [];
            }
        }
        return [];
    });

    // Слушаем изменения localStorage из других вкладок
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'favoriteFolders' && e.newValue) {
                try {
                    setFavorites(JSON.parse(e.newValue));
                } catch (error) {
                    console.error('Error syncing favorites:', error);
                }
            }
            if (e.key === 'favoriteFiles' && e.newValue) {
                try {
                    setFavoriteFiles(JSON.parse(e.newValue));
                } catch (error) {
                    console.error('Error syncing favorite files:', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Сохранение избранных папок в localStorage
    useEffect(() => {
        localStorage.setItem('favoriteFolders', JSON.stringify(favorites));
    }, [favorites]);

    // Сохранение избранных файлов в localStorage
    useEffect(() => {
        localStorage.setItem('favoriteFiles', JSON.stringify(favoriteFiles));
    }, [favoriteFiles]);

    // Добавить папку в избранное
    const addToFavorites = (folder) => {
        if (!folder || !folder.id) {
            return;
        }

        const exists = favorites.some(fav => fav.id === folder.id && fav.storageId === folder.storageId);

        if (exists) {
            return;
        }

        const favoriteFolder = {
            id: folder.id,
            name: folder.name,
            storageId: folder.storageId || 'kudo',
            storageType: folder.storageType || 'KUDO',
            addedAt: new Date().toISOString()
        };

        setFavorites(prev => [...prev, favoriteFolder]);
    };

    // Удалить папку из избранного
    const removeFromFavorites = (folderId, storageId) => {
        setFavorites(prev => prev.filter(
            fav => !(fav.id === folderId && fav.storageId === storageId)
        ));
    };

    // Проверить, находится ли папка в избранном
    const isFavorite = (folderId, storageId) => {
        return favorites.some(fav => fav.id === folderId && fav.storageId === storageId);
    };

    // Переупорядочить избранные папки
    const reorderFavorites = (startIndex, endIndex) => {
        const result = Array.from(favorites);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setFavorites(result);
    };

    // Обновить порядок избранных папок
    const updateFavoritesOrder = (newOrder) => {
        setFavorites(newOrder);
    };

    // Добавить файл в избранное
    const addFileToFavorites = (file) => {
        if (!file || !file.id) {
            console.error('Invalid file data');
            return;
        }

        const exists = favoriteFiles.some(fav => fav.id === file.id && fav.storageId === file.storageId);

        if (exists) {
            return;
        }

        const favoriteFile = {
            id: file.id,
            name: file.name,
            type: file.type,
            size: file.size,
            storageId: file.storageId || 'kudo',
            storageType: file.storageType || 'KUDO',
            addedAt: new Date().toISOString()
        };

        setFavoriteFiles(prev => [...prev, favoriteFile]);
    };

    // Удалить файл из избранного
    const removeFileFromFavorites = (fileId, storageId) => {
        setFavoriteFiles(prev => prev.filter(
            fav => !(fav.id === fileId && fav.storageId === storageId)
        ));
    };

    // Проверить, находится ли файл в избранном
    const isFileFavorite = (fileId, storageId) => {
        return favoriteFiles.some(fav => fav.id === fileId && fav.storageId === storageId);
    };

    // Переупорядочить избранные файлы
    const reorderFavoriteFiles = (startIndex, endIndex) => {
        const result = Array.from(favoriteFiles);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setFavoriteFiles(result);
    };

    // Обновить порядок избранных файлов
    const updateFavoriteFilesOrder = (newOrder) => {
        setFavoriteFiles(newOrder);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        reorderFavorites,
        updateFavoritesOrder,
        favoriteFiles,
        addFileToFavorites,
        removeFileFromFavorites,
        isFileFavorite,
        reorderFavoriteFiles,
        updateFavoriteFilesOrder
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};
