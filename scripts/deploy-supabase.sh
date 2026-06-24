#!/usr/bin/env bash
set -euo pipefail

PROJECT_REF="${SUPABASE_PROJECT_REF:-doqpjnbgwycfgawpjomf}"

echo "Linking Supabase project ${PROJECT_REF}..."
npx supabase link --project-ref "${PROJECT_REF}"

echo "Applying database migrations..."
npx supabase db push

echo "Deploying Edge Functions..."
npx supabase functions deploy generate-prompt --project-ref "${PROJECT_REF}"
npx supabase functions deploy create-checkout-session --project-ref "${PROJECT_REF}"
npx supabase functions deploy get-checkout-session --project-ref "${PROJECT_REF}"
npx supabase functions deploy create-portal-session --project-ref "${PROJECT_REF}"
npx supabase functions deploy stripe-webhook --project-ref "${PROJECT_REF}"

echo "Supabase migrations and Edge Functions deployed."
