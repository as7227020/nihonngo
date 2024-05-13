"use client";
export default function Home() {
  const test = async () => {
    console.log("click");
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: "123" }),
    });

    const ans = response.json();
    console.log(ans);
  };
  return (
    <div className="container p-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
          </p>

          <button
            onClick={() => {
              test();
            }}
          >
            點
          </button>
          <a href="/api/auth/signin">登入</a>
        </div>
      </div>
    </div>
  );
}
