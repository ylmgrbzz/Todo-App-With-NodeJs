const express = require("express");
const app = express();

// dotenv modülünü kullanarak .env dosyasındaki yapılandırma ayarlarını okuyoruz.
require("dotenv").config();

// Veritabanına bağlanmak için gerekli dosyayı içe aktarıyoruz.
require("./src/config/databaseConnection");

// Port numarasını belirliyoruz, eğer ortam değişkeni tanımlı değilse varsayılan olarak 5001'i kullanıyoruz.
const port = process.env.PORT || 5001;

// Router'ı içe aktarıyoruz.
const todoRouter = require("./src/routers/todoRouter");

// Gelen isteklerdeki JSON verilerini analiz etmek için ara yazılımı kullanıyoruz.
app.use(express.json());

// "/api" yoluna gelen istekler için todoRouter'ı kullanıyoruz.
app.use("/api", todoRouter);

// Kök dizine yapılan GET isteklerine "Hoş Geldiniz ..." yanıtı döndürüyoruz.
app.get("/", (req, res) => {
  res.send("Hoş Geldiniz ...");
});

// Belirlenen portta (veya varsayılan olarak 5001) uygulamayı dinlemeye başlıyoruz.
app.listen(port, () => {
  console.log(`Server ${port} Portundan Başlatıldı ...`);
});
