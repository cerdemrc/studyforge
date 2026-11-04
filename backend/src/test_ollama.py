import ollama

response = ollama.chat(
    model="qwen2.5:7b",
    messages=[
        {
            "role": "user",
            "content": "Makine öğrenmesi nedir? Kısaca açıkla."
        }
    ]
)

print(response["message"]["content"])