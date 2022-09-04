FROM ruby:3.1.1 AS drkiq-development

RUN apt-get update && apt-get install -y --no-install-recommends build-essential postgresql-client

# Default directory
ENV INSTALL_PATH /app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

# Install gems
COPY . .
RUN bundle install

# Start server
ENTRYPOINT ["/bin/bash", "-c"]
CMD ["bundle exec rails s -b 0.0.0.0"]