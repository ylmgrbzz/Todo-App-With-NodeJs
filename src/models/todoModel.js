// Mongoose modülünü çağırıyoruz ve "mongoose" adında bir değişkene atıyoruz.
const mongoose = require("mongoose");

// Yeni bir mongoose şema (schema) tanımlıyoruz. Bu şema, veritabanındaki 'Todo' koleksiyonunu temsil edecek.
const todoSchema = new mongoose.Schema(
  {
    // Görevin adını temsil eden bir alan tanımlıyoruz. Bu alan bir metin (String) ve boş olmamalıdır (required). Ayrıca başındaki ve sonundaki boşluklar silinir (trim).
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Görevin açıklamasını temsil eden bir alan tanımlıyoruz. Bu alan bir metin (String) ve boş olmamalıdır (required). Ayrıca başındaki ve sonundaki boşluklar silinir (trim).
    description: {
      type: String,
      required: true,
      trim: true,
    },
    // Görevin tamamlanıp tamamlanmadığını belirten bir alan tanımlıyoruz. Bu alan bir boolean (Boolean) ve varsayılan olarak false değerine sahiptir (default: false).
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Bu şema için kullanılacak olan MongoDB koleksiyonunun adını belirtiyoruz: 'Todo'.
    collection: "Todo",
    // timestamps: true ayarı, her belge için otomatik olarak createdAt ve updatedAt alanlarının eklenmesini sağlar.
    timestamps: true,
  }
);

// mongoose.model() fonksiyonunu kullanarak, 'Todo' adında bir model oluşturuyoruz. Bu model, yukarıda tanımladığımız todoSchema'ya dayanacak.
const Todo = mongoose.model("Todo", todoSchema);

// Oluşturulan modeli dışa aktarıyoruz, böylece başka dosyalarda kullanılabilir hale geliyor.
module.exports = Todo;
