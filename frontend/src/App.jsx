
async function App() {
  
  var test = 0;
  if(test == 0) {
    const res = await fetch("/api/")
    console.log(res);
    test++;
  }

  return <h1>Test2</h1>;
}

export default App;