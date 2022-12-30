// se enabled == false alllora in produzione non sarà mostrato. sarà mostrato solo in ambiente di sviluppo 
export const menu = [
    { enabled: true, title: 'Budget Books', url: 'budget-books', icon: 'book', active: false },
    { enabled: true, title: 'Categories', url: 'categories', icon: 'grid', active: false },
    { enabled: false, title: 'Saving Goals', url: 'saving-goals', icon: 'medal', active: false },
    { enabled: false, title: 'Reports', url: 'reports', icon: 'bar-chart', active: false },
    { enabled: true, title: 'Recurrings', url: 'recurrings', icon: 'repeat', active: false },

]