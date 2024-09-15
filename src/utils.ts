// Types for login and return
type LoginProps = {
  email: string;
  password: string;
};
type PromiseReturn = Promise<void>;

export function login({ email, password }: LoginProps): PromiseReturn {
  const delay = (0.7 + Math.random() * 2) * 1000;
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (password === "password123" && !!email) {
        resolve();
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, delay);
  });
}
