// mongoose modülünü çağırıyoruz ve "mongoose" adında bir değişkene atıyoruz.
const mongoose = require("mongoose");

// process.env.MONGO_CONNECTION_STRING'den alınan MongoDB bağlantı dizesini kullanarak veritabanına bağlanıyoruz.
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true, // MongoDB'nin yeni URL ayrıştırıcısını kullanmak için gerekli seçenek.
    useUnifiedTopology: true, // MongoDB sunucu seçeneklerini kurarken birleştirilmiş topoloji kullanmak için gerekli seçenek.
  })
  .then(() => {
    // Bağlantı başarılıysa, konsola "Veritabanına Başarıyla Bağlandı" mesajını yazdırıyoruz.
    console.log("Veritabanına Başarıyla Bağlandı");
  })
  .catch((err) => {
    // Bağlantı başarısızsa, konsola "Veritabanına Bağlanılamadı" mesajını ve hata detayını yazdırıyoruz.
    console.log("Veritabanına Bağlanılamadı : " + err);
  });
