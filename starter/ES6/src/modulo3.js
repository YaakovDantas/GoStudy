// https://skylab.rocketseat.com.br/api/files/1566499323808.pdf

const delay = () => new Promise(resolve => 
  setTimeout(() =>{ 
    resolve("ok")
  }, 1000)
);

export async function umPorSegundo() {
  console.log(await delay());
  console.log(await delay());
  console.log(await delay());
}

