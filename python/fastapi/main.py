from fastapi import FastAPI
app = FastAPI

@app.get("/")
def read_root():
    return{"Hello":"World"}

if __name__=='__main__':
    uvicorn.run(app, host="0.0.0.0", port=3000)