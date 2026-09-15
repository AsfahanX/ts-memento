let gudangs = null

function getGudangs()
{

let libStokBarang = libById(
  'RUNQRCkxQUk6JmhzOilQVjNJV28'
)
let libGudang = libById(
  'XSNaUEFQbWdzWHBnJXVdNXZUTlE'
)

let fieldNames = libStokBarang
  .fields()

return libGudang
  .entries()
  .filter(v =>
    fieldNames.includes(v.name)
)

}

function createIfMissing(barangs)
{

let libBarang = libById(
  'QFQxY0BKVWQ0elJkKTY5SSU6cUM'
)
let libStokBarang = libById(
  'RUNQRCkxQUk6JmhzOilQVjNJV28'
)

barangs ??= libBarang.entries()
let entries = libStokBarang
  .entries()
  .map(v => v
    .field('Barang')?.[0]?.id
  )

let missings = barangs
  .filter(v => !entries
    .includes(v.id)
  )

log(missings.length)
return missings
  .map(v => libStokBarang
    .create({
      Barang: [v],
      'Gambar utama': v.field(
        'Gambar utama'
      )
    })
  )

}

function findEntries(barangs)
{

let libBarang = libById(
  'QFQxY0BKVWQ0elJkKTY5SSU6cUM'
)
let libStokBarang = libById(
  'RUNQRCkxQUk6JmhzOilQVjNJV28'
)

barangs ??= libBarang.entries()
createIfMissing(barangs)
barangs = barangs.map(v => v.id)

return libStokBarang
  .entries()
  .filter(v => barangs.includes(
    v.field('Barang')?.[0]?.id
  ))



}

function updateStok(e) {

gudangs ??= getGudangs()


e ??= entry()
let barang = e.field('Barang')?.[0] ?? undefined
if(!barang) {
  return
}

gudangs.forEach(gudang => {

/*
let result = sql(`SELECT SUM(j."_Perubahan kuantitas") as total FROM "Item Jurnal Barang" j JOIN "Master Barang" b ON j.Barang = b.id WHERE j.removed = 0 AND j.Barang = '`+ barang.id + "' AND j.Gudang = '" + gudang.id + "'")
  .asInt();
*/

let result = sql('SELECT '+
'SUM(j."_Perubahan kuantitas") as total '+
'FROM "Item Jurnal Barang" j '+
'JOIN "Master Barang" b '+
'ON j.Barang = b.id '+
'WHERE j.removed = 0 '+
'AND j.Barang ='+`'${barang.id}' `+
'AND j.Gudang ='+`'${gudang.id}' `
)
result = result.asInt()
result = result == 0
  ? null
  : result

e.set(gudang.name, result)


})

}