"""
Delete DB entries whose timestamp ends in :00:00 (i.e. set to race-time, not actual save time).
Fetches all results from the live API, filters bad ones, deletes via /api/delete-result.
"""
import json, urllib.request, urllib.error

API_BASE = "https://cheltenham.vercel.app"

# Fetch all saved entries
with urllib.request.urlopen(f"{API_BASE}/api/results", timeout=10) as resp:
    entries = json.loads(resp.read())

print(f"Total entries in DB: {len(entries)}")

bad = [e for e in entries if e.get('timestamp', '').endswith(':00.000000Z') or
                             e.get('timestamp', '').endswith(':00Z') or
                             (len(e.get('timestamp','')) >= 19 and e['timestamp'][17:19] == '00' and e['timestamp'][14:16] == '00')]

print(f"Bad entries (whole-minute timestamps): {len(bad)}")
for e in bad:
    print(f"  id={e['file']}  race={e['race']}  ts={e['timestamp']}")

if not bad:
    print("Nothing to delete.")
    exit()

confirm = input(f"\nDelete these {len(bad)} entries? [y/N]: ").strip().lower()
if confirm != 'y':
    print("Aborted.")
    exit()

deleted = 0
for e in bad:
    url = f"{API_BASE}/api/delete-result?id={e['file']}"
    req = urllib.request.Request(url, method='DELETE')
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
            print(f"  DELETED id={e['file']} {e['race']} {e['timestamp']}")
            deleted += 1
    except Exception as ex:
        print(f"  ERROR deleting id={e['file']}: {ex}")

print(f"\nDone — deleted {deleted}/{len(bad)} entries.")
