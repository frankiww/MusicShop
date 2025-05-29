export function getAdminControls(isAdmin, itemType, handlers){
    if(!isAdmin) {
        return null;
    }

    const controls = [];

    //редактировать
    if (handlers.onEdit) {
        controls.push({
            label: 'Редактировать',
            onClick: () => handlers.onEdit(),
            class: 'admin-button edit-button',
        });
    }

    //удалить
    if (handlers.onDelete) {
        controls.push({
            label: 'Удалить',
            onClick: () => handlers.onDelete(),
            class: 'admin-button delete-button',
        });
}

    if (itemType === 'recording' && handlers.onAdd) {
        controls.push({
          label: 'Добавить',
          onClick: () => handlers.onAdd(),
          class: 'admin-button add-button',
          outsideRow: true, // чтобы можно было рендерить отдельно
        });
    }

    return controls;
}