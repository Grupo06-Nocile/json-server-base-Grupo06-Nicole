const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
var bcrypt = require("bcryptjs");
const port = process.env.PORT || 3001;
const { v4: uuidv4 } = require("uuid");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

router.db._.id = "uuid";
app.db = router.db;
app.use(jsonServer.bodyParser);
app.use(middlewares);

app.use((req, res, next) => {
  const uuidUrls = ["/users"];
  if (req.method === "POST" && uuidUrls.includes(req.originalUrl)) {
    const newUuid = uuidv4();
    const newBody = { ...req.body, uuid: newUuid };
    req.body = newBody;
  }
  next();
});
app.post("/sendemail", async (request, response) => {
  const db = router.db;
  const { email } = request.body;

  if (!email) {
    return response.status(400).json({ msg: "email invalido!" });
  }

  const user = db.get("users").find({ email }).value();

  if (!user) {
    return response.status(404).json({ msg: "usuario invalido!" });
  }

  const tokenResetPassword = uuidv4();
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  db.get("tokenRecovery")
    .value()
    .push({ token: tokenResetPassword, userUuid: user.uuid });
  await db.write();
  const msg = {
    to: `${user.email}`,
    from: "searchapi@hotmail.com",
    subject: "Recuperação de senha",
    text: "Token de reset password",
    html: `Token para recuperar a senha: ${tokenResetPassword}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      return response.json({ msg: "Email enviado" });
    })
    .catch((error) => {
      console.error(error);
      return response.status(500).json({ msg: "Falha ao enviar email" });
    });
});
app.patch("/updatepassword", async (request, response) => {
  const db = router.db;
  const { token, newPassword } = request.body;
  const verifyToken = db.get("tokenRecovery").find({ token }).value();
  const { userUuid } = verifyToken;

  if (!verifyToken) {
    return response.status(404).json({ msg: "Token invalido!" });
  }

  const user = db.get("users").find({ uuid: userUuid }).value();

  if (!user) {
    return response.status(404).json({ msg: "usuario invalido!" });
  }

  const cryptedPassword = await bcrypt.hash(newPassword, 10);
  user.password = cryptedPassword;
  await db.write();
  return response.status(200).json({ msg: "Senha alterada!" });
});

const rules = auth.rewriter({
  users: 600,
  apiList: 664,
  favoriteApi: 660,
  comments: 660,
});

app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);
app.listen(port);

console.log("Server is running on port:", port);
