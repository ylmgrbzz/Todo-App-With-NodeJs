// "../models/todoModel" dosyasından todoModel adlı modülü çağırıyoruz. Bu modül, MongoDB'deki 'Todo' koleksiyonu için Mongoose modelini içerir.
const todo = require("../models/todoModel");

// Yeni bir görev eklemek için bir işlev tanımlıyoruz. Bu işlev, req (istek) ve res (yanıt) parametrelerini alır.
const todoAdd = async (req, res) => {
  try {
    // İstekteki görev adını içeren bir belgeyi bulmaya çalışıyoruz.
    const _todo = await todo.findOne({ name: req.body.name });
    if (_todo) {
      // Eğer belge bulunursa, istemciye "Bu isimde kayıt mevcut" mesajıyla birlikte 400 durum koduyla bir hata yanıtı gönderiyoruz.
      return res.status(400).json({
        success: false,
        message: "Bu isimde kayıt mevcut",
      });
    }

    // Eğer belge bulunmazsa, istek gövdesindeki verilere dayalı yeni bir todo nesnesi oluşturuyoruz.
    const todoAdd = new todo(req.body);

    // Oluşturulan todo nesnesini veritabanına kaydetmeye çalışıyoruz.
    await todoAdd
      .save()
      .then(() => {
        // Kaydetme işlemi başarılıysa, 201 durum koduyla birlikte oluşturulan todo nesnesini yanıt olarak gönderiyoruz.
        return res.status(201).json(todoAdd);
      })
      .catch((err) => {
        // Eğer kaydetme işlemi sırasında bir hata oluşursa, istemciye bir hata mesajıyla birlikte 400 durum koduyla bir hata yanıtı gönderiyoruz.
        return res.status(400).json({
          success: false,
          message: "Kayıt Oluşturulurken Hata Çıktı : " + err,
        });
      });
  } catch (error) {
    // Herhangi bir istisna oluşursa, istemciye bir hata mesajıyla birlikte 500 durum koduyla bir hata yanıtı gönderiyoruz.
    return res.status(500).json({
      success: false,
      message: "Kayıt Oluşturulamadı !",
    });
  }
};

// Tüm görevleri almak için bir işlev tanımlıyoruz.
const todoGetAll = async (req, res) => {
  // İstekteki sayfa numarasını alıyoruz.
  const { page } = req.query;
  const limit = 2; // Her sayfada görüntülenecek görev sayısı.
  const skip = Number(page - 1) * limit; // Atlama değeri hesaplanır.

  try {
    // Tüm görevleri veritabanından alıyoruz ve sayfalama yaparak sınırlandırıyoruz.
    const todoGetAll = await todo.find({}).limit(limit).skip(skip);
    // Alınan görevleri başarılı bir şekilde istemciye gönderiyoruz.
    return res.status(200).json({
      success: true,
      data: todoGetAll,
    });
  } catch (error) {
    // Herhangi bir hata durumunda, istemciye bir hata mesajıyla birlikte 500 durum koduyla bir hata yanıtı gönderiyoruz.
    return res.status(500).json({
      success: false,
      message: "Kayıt Getirilemedi !",
    });
  }
};
// Bir görevi güncellemek için bir işlev tanımlıyoruz.
const todoUpdate = async (req, res) => {
  const { id } = req.params; // İsteğin parametrelerinden görev kimliğini alıyoruz.

  try {
    // Belirtilen kimliğe sahip görevi güncellemeye çalışıyoruz.
    const todoUpdate = await todo.findByIdAndUpdate(id, req.body);
    if (todoUpdate) {
      // Güncelleme başarılıysa, istemciye bir başarı mesajıyla birlikte 200 durum koduyla bir yanıt gönderiyoruz.
      return res.status(200).json({
        success: true,
        message: "Güncelleme Başarılı",
      });
    } else {
      // Güncelleme başarısızsa, istemciye bir hata mesajıyla birlikte 400 durum koduyla bir hata yanıtı gönderiyoruz.
      return res.status(400).json({
        success: false,
        message: "Kayıt Güncellenemedi !",
      });
    }
  } catch (error) {
    // Herhangi bir hata durumunda, istemciye bir hata mesajıyla birlikte 500 durum koduyla bir hata yanıtı gönderiyoruz.
    return res.status(500).json({
      success: false,
      message: "Kayıt Güncellenemedi !",
    });
  }
};

// Bir görevi silmek için bir işlev tanımlıyoruz.
const todoDelete = async (req, res) => {
  const { id } = req.params; // İsteğin parametrelerinden görev kimliğini alıyoruz.

  try {
    // Belirtilen kimliğe sahip görevi silmeye çalışıyoruz.
    const todoDelete = await todo.findByIdAndDelete(id);
    if (todoDelete) {
      // Silme işlemi başarılıysa, istemciye bir başarı mesajıyla birlikte 200 durum koduyla bir yanıt gönderiyoruz.
      return res.status(200).json({
        success: true,
        message: "Kayıt Başarıyla Silindi",
      });
    } else {
      // Silme işlemi başarısızsa, istemciye bir hata mesajıyla birlikte 400 durum koduyla bir hata yanıtı gönderiyoruz.
      return res.status(400).json({
        success: false,
        message: "Kayıt Silinemedi",
      });
    }
  } catch (error) {
    // Herhangi bir hata durumunda, istemciye bir hata mesajıyla birlikte 500 durum koduyla bir hata yanıtı gönderiyoruz.
    return res.status(500).json({
      success: false,
      message: "Kayıt Silinemedi : " + error,
    });
  }
};

// Belirli bir görevi almak için bir işlev tanımlıyoruz.
const todoGet = async (req, res) => {
  const { id } = req.params; // İsteğin parametrelerinden görev kimliğini alıyoruz.

  // Belirtilen kimliğe sahip görevi veritabanından alıyoruz.
  const todoGet = await todo.findById(id);
  if (todoGet) {
    // Eğer görev bulunursa, istemciye gönderiyoruz.
    return res.status(200).json(todoGet);
  } else {
    // Eğer görev bulunamazsa, istemciye bir hata mesajıyla birlikte 404 durum koduyla bir hata yanıtı gönderiyoruz.
    return res.status(404).json({
      success: false,
      message: "Kayıt Bulunamadı !",
    });
  }
};

// İşlevleri dışa aktarıyoruz, böylece diğer dosyalarda kullanılabilir hale geliyorlar.
module.exports = {
  todoAdd,
  todoGetAll,
  todoUpdate,
  todoDelete,
  todoGet,
};
