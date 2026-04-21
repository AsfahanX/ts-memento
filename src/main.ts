function ubahKolomKeRelasi(foreignKey, column, libraryName, ownerKey) {
    lib().entries().forEach(e => {
        const val = e.field(column)
        if (val) {
            const parentLib = libByName(libraryName);
            const parent = parentLib?.findByKey(val)
            e.set(foreignKey, [parent]);
        }
    })
}

function mymessage(params) {
    message('github nih');
}
