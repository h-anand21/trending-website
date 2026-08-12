import os
import sys

songs = [
    {"id": "song_1", "name": "Ae Mere Watan Ke Logon", "query": "ytsearch1:Ae Mere Watan Ke Logon Lata Mangeshkar official"},
    {"id": "song_2", "name": "Maa Tujhe Salaam", "query": "ytsearch1:Maa Tujhe Salaam AR Rahman official video"},
    {"id": "song_3", "name": "Sandese Aate Hai", "query": "ytsearch1:Sandese Aate Hai Border official song"},
    {"id": "song_4", "name": "Bharat Humko Jaan Se Pyara Hai", "query": "ytsearch1:Bharat Humko Jaan Se Pyara Hai Roja official"},
    {"id": "song_5", "name": "Chak De India", "query": "ytsearch1:Chak De India Sukhwinder Singh official title track"},
    {"id": "song_6", "name": "Teri Mitti", "query": "ytsearch1:Teri Mitti Kesari B Praak official song"}
]

os.makedirs("public/audio", exist_ok=True)

import yt_dlp

ydl_opts_base = {
    'format': 'bestaudio[ext=m4a]/bestaudio/best',
    'quiet': False,
    'no_warnings': True,
    'ignoreerrors': True
}

for s in songs:
    out_path = f"public/audio/{s['id']}.%(ext)s"
    print(f"Downloading {s['name']} -> {out_path}...")
    opts = dict(ydl_opts_base)
    opts['outtmpl'] = f"public/audio/{s['id']}.%(ext)s"
    with yt_dlp.YoutubeDL(opts) as ydl:
        try:
            ydl.download([s['query']])
        except Exception as e:
            print(f"Error downloading {s['name']}: {e}")

print("All downloads finished!")
