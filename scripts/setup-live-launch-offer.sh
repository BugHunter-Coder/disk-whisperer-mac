#!/usr/bin/env bash
# Creates the one-time $10 "MacDissect Pro (Lifetime)" product and the 100%-off LAUNCH50
# code (50 uses) in LIVE Dodo, then points the Cloudflare Worker at the new product.
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; . ./.env.local; set +a

B=https://live.dodopayments.com
H="Authorization: Bearer $DODO_LIVE_PAYMENTS_API_KEY"

P=$(curl -s -X POST "$B/products" -H "$H" -H "Content-Type: application/json" -d '{
  "name": "MacDissect Pro (Lifetime)",
  "description": "MacDissect Pro lifetime license for 1 Mac. One-time payment, no renewals.",
  "tax_category": "saas",
  "price": {"type": "one_time_price", "price": 1000, "currency": "USD", "discount": 0,
            "purchasing_power_parity": false, "tax_inclusive": false}
}')
PID=$(echo "$P" | python3 -c "import json,sys;print(json.load(sys.stdin).get('product_id',''))")
[ -n "$PID" ] || { echo "Product creation failed: $P"; exit 1; }
echo "Live product: $PID"

curl -s -X POST "$B/discounts" -H "$H" -H "Content-Type: application/json" -d "{
  \"code\": \"LAUNCH50\", \"name\": \"Launch: first 50 free\", \"type\": \"percentage\",
  \"amount\": 10000, \"usage_limit\": 50, \"restricted_to\": [\"$PID\"]
}"
echo

echo "Test checkout (should show \$0 and no card step):"
curl -s -X POST "$B/checkouts" -H "$H" -H "Content-Type: application/json" -d "{
  \"product_cart\": [{\"product_id\": \"$PID\", \"quantity\": 1}],
  \"discount_codes\": [\"LAUNCH50\"],
  \"customer\": {\"email\": \"test@example.com\", \"name\": \"Test\"},
  \"return_url\": \"https://macdissect.com/pricing?purchased=1\"
}"
echo

echo "Setting Worker secret DODO_PRODUCT_ID=$PID ..."
printf '%s' "$PID" | npx -y wrangler secret put DODO_PRODUCT_ID --name disk-whisperer-mac
echo "Done."
