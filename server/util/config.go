package util

import "github.com/spf13/viper"

type Config struct {
	DBFile   string `mapstructure:"DB_FILE"`
	HTTPPort string `mapstructure:"HTTP_PORT"`
}

func LoadConfig() (*Config, error) {
	viper.SetConfigFile(".env")

	err := viper.ReadInConfig()
	if err != nil {
		return nil, err
	}
	c := &Config{}
	err = viper.Unmarshal(c)
	if err != nil {
		return nil, err
	}
	return c, nil
}
