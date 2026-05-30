
import os
from mistralai import Mistral
from mistralai.models import UserMessage

os.environ["MISTRAL_API_KEY"] = "JjdDxg4A2ZJU7Jtkuj2zujQudUOB2c6K"

client = Mistral(api_key=os.environ["MISTRAL_API_KEY"])

messages = [
    UserMessage(role="user", content="Create a good looking profile card in css and html")
]

response = client.chat.stream(
    model="mistral-large-2407",
    messages=messages,
    stream=True,
)

content = []
for event in response:
    delta = event.data.choices[0].delta
    if delta.content is not None:
        content.append(delta.content)

print("".join(content))
print("Done!")
#In line view

