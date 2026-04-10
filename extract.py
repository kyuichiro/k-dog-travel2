import re
import json

f = open('config.js', encoding='utf-8').read()
import re
strings = re.findall(r'[\'"`]([^\'"`]*[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]+[^\'"`]*)[\'"`]', f)
out = open('strings.txt', 'w', encoding='utf-8')
for s in set(strings):
    out.write(s.strip() + "\n")
out.close()
