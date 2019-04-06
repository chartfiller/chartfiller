.DEFAULT_GOAL:=help
.PHONY:
PROJECT_NAME = chartfiller
PWD=$(shell pwd)
BUILD_DIR=$(PWD)/build
SRC_DIR=$(PWD)/src
PROJECT_VERSION=$(shell cat $(SRC_DIR)/manifest.json | jq -r .version)

ZIPFILE=$(BUILD_DIR)/$(PROJECT_NAME)-$(PROJECT_VERSION).zip

.PHONY: clean
clean:
	@rm -rf $(BUILD_DIR)
	@find . -name '*~' -delete
	@find . -name '*#' -delete

.PHONY: build
build:
	mkdir -p $(BUILD_DIR)
	cd $(SRC_DIR) && zip $(ZIPFILE) *

.PHONY: help
help: ## Display this message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: test
test:
	@echo Nothing to do
