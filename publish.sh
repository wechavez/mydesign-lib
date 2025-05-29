#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to run command with status reporting
run_with_status() {
    local cmd="$1"
    local description="$2"
    
    print_status "$description..."
    
    if eval "$cmd"; then
        print_success "$description completed successfully"
        return 0
    else
        print_error "$description failed"
        return 1
    fi
}

# Main publish function
publish_package() {
    local version_type="$1"
    
    echo "🚀 Publishing package with $version_type version bump..."
    echo "================================================="
    
    # Step 1: Run tests
    if ! run_with_status "npm run test" "Running tests"; then
        print_error "Tests failed. Aborting publish."
        exit 1
    fi
    
    # Step 2: Build project
    if ! run_with_status "npm run build" "Building project"; then
        print_error "Build failed. Aborting publish."
        exit 1
    fi
    
    # Step 3: Update version
    if ! run_with_status "npm version $version_type" "Updating version ($version_type)"; then
        print_error "Version update failed. Aborting publish."
        exit 1
    fi
    
    # Step 4: Publish to npm
    print_status "Publishing to npm..."
    if npm publish; then
        print_success "Package published successfully! 🎉"
        
        # Show the new version
        local new_version=$(node -p "require('./package.json').version")
        print_success "New version: $new_version"
        
        # Remind about git push
        print_warning "Don't forget to push the version tag to git:"
        echo "  git push && git push --tags"
    else
        print_error "npm publish failed"
        exit 1
    fi
}

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Parse command line arguments
case "$1" in
    "patch"|"minor"|"major")
        publish_package "$1"
        ;;
    "")
        echo "📦 Package Publisher"
        echo "==================="
        echo ""
        echo "Choose version bump type:"
        echo "1) patch (1.0.0 → 1.0.1) - Bug fixes"
        echo "2) minor (1.0.0 → 1.1.0) - New features"
        echo "3) major (1.0.0 → 2.0.0) - Breaking changes"
        echo ""
        read -p "Enter choice (1-3): " choice
        
        case $choice in
            1) publish_package "patch" ;;
            2) publish_package "minor" ;;
            3) publish_package "major" ;;
            *) 
                print_error "Invalid choice. Use 1, 2, or 3."
                exit 1
                ;;
        esac
        ;;
    *)
        echo "Usage: $0 [patch|minor|major]"
        echo ""
        echo "Examples:"
        echo "  $0 patch    # Bump patch version and publish"
        echo "  $0 minor    # Bump minor version and publish"
        echo "  $0 major    # Bump major version and publish"
        echo "  $0          # Interactive mode"
        exit 1
        ;;
esac 