FROM node:22.13.0-alpine3.21

# Step1. enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /build

# Step2. Install dependencies
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

# Step3. Build the app
RUN pnpm run build

# Step4. Run the app
ENV NODE_ENV="production"

CMD ["pnpm", "run", "start:prod"]
