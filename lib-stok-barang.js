const libStokBarang = {
  helper: {
    _gudangs: null,
    gudangs() {
      if (this._gudangs) return this._gudangs;

      let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");
      let libGudang = libById("XSNaUEFQbWdzWHBnJXVdNXZUTlE");
      let fieldNames = libStokBarang.fields();

      this._gudangs = libGudang
        .entries()
        .filter((v) => fieldNames.includes(v.name));
      return this._gudangs;
    },

    createIfMissing(barangs) {
      let libBarang = libById("QFQxY0BKVWQ0elJkKTY5SSU6cUM");
      let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");

      barangs ??= libBarang.entries();
      let entries = libStokBarang
        .entries()
        .map((v) => v.field("Barang")?.[0]?.id);

      let missings = barangs.filter((v) => !entries.includes(v.id));

     // log(missings.length);
      return missings.map((v) =>
        libStokBarang.create({
          Barang: [v],
          "Gambar utama": v.field("Gambar utama"),
        }),
      );
    },

    findEntries(barangs) {
      let libBarang = libById("QFQxY0BKVWQ0elJkKTY5SSU6cUM");
      let libStokBarang = libById("RUNQRCkxQUk6JmhzOilQVjNJV28");

      barangs ??= libBarang.entries();
      this.createIfMissing(barangs);
      barangs = barangs.map((v) => v.id);

      return libStokBarang
        .entries()
        .filter((v) => barangs.includes(v.field("Barang")?.[0]?.id));
    },

    updateStockBalance(e) {
      e ??= entry();
      let barang = e.field("Barang")?.[0] ?? undefined;
      if (!barang) {
        return;
      }

      this.gudangs().forEach((gudang) => {
        let result = sql(
          'SELECT SUM(j."_Perubahan kuantitas") as total ' +
            'FROM "Item Jurnal Barang" j ' +
            'JOIN "Master Barang" b ' +
            "ON j.Barang = b.id " +
            "WHERE j.removed = 0 " +
            `AND j.Barang = '${barang.id}' ` +
            `AND j.Gudang = '${gudang.id}' `,
        );
        result = result.asInt();
        result = result == 0 ? null : result;

        e.set(gudang.name, result);
      });
    },

    updateStok(barangs) {
     // let barangs = items.map((v) => v.field("Barang")?.[0]);

      this.findEntries(barangs).forEach((v) => {
        this.updateStockBalance(v);
        v.recalc();
        v.field("Barang")?.[0]?.recalc();
        message("Stok diupdate: " + v.name);
      });
    },
  },
};
