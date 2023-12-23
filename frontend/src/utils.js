export const populateArchiveFilter = (filter) => {
    if ('isArchived' in filter) {
        return filter.isArchived ? 'Archived' : 'Unarchived';
    }
    return 'All';
}
