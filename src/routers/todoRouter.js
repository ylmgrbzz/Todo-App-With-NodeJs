// Express kütüphanesinden Router modülünü çağırıyoruz ve router adında bir nesne oluşturuyoruz.
const router = require("express").Router();

// "../controllers/todoController" dosyasından todoController adlı modülü çağırıyoruz.
const todoController = require("../controllers/todoController");

// Yeni bir görev eklemek için POST isteği yönlendirilir. "/todo" yoluna gelen POST istekleri todoController.todoAdd işlevine yönlendirilir.
router.post("/todo", todoController.todoAdd);

// Tüm görevleri almak için GET isteği yönlendirilir. "/todo" yoluna gelen GET istekleri todoController.todoGetAll işlevine yönlendirilir.
router.get("/todo", todoController.todoGetAll);

// Bir görevi güncellemek için PUT isteği yönlendirilir. ":id" parametresi aracılığıyla belirli bir görevin kimliği belirtilir ve "/todo/:id" yoluna gelen PUT istekleri todoController.todoUpdate işlevine yönlendirilir.
router.put("/todo/:id", todoController.todoUpdate);

// Bir görevi silmek için DELETE isteği yönlendirilir. ":id" parametresi aracılığıyla belirli bir görevin kimliği belirtilir ve "/todo/:id" yoluna gelen DELETE istekleri todoController.todoDelete işlevine yönlendirilir.
router.delete("/todo/:id", todoController.todoDelete);

// Belirli bir görevi almak için GET isteği yönlendirilir. ":id" parametresi aracılığıyla belirli bir görevin kimliği belirtilir ve "/todo/:id" yoluna gelen GET istekleri todoController.todoGet işlevine yönlendirilir.
router.get("/todo/:id", todoController.todoGet);

// Oluşturulan router nesnesini dışa aktarıyoruz, böylece başka dosyalarda kullanılabilir hale geliyor.
module.exports = router;
