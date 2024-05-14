include .env

ifndef ENV
ENV=dev
endif

ifeq ($(ENV),dev)
SSH_PORT=221
endif

ifeq ($(ENV),prod)
SSH_PORT=222
endif

push:
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "rm -rf $(APP_PATH) && mkdir -p $(APP_PATH)"
	scp -P $(SSH_PORT) -r $(APP_FILES) $(SSH_USER)@$(SSH_HOST):$(APP_PATH)
	ssh -p $(SSH_PORT) $(SSH_USER)@$(SSH_HOST) "cd  $(APP_PATH) && npm i"